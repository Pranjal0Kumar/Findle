from flask import Blueprint
from flask_socketio import SocketIO, emit
import base64
import numpy as np

import cv2
from deepface import DeepFace
from data.config import cases_col
from scipy.spatial.distance import cosine
from core.extensions import socketio
import traceback

socketio_bp = Blueprint('socketio_bp',__name__)
@socketio.on('frame')
def handle_live_frame(data):
    try:
        image_data = base64.b64decode(data['image'].split(',')[1])
        e_bytes = np.frombuffer(image_data,np.uint8)
        image_np = cv2.imdecode(e_bytes,cv2.IMREAD_COLOR)
        if image_np is None:
            emit('scan_result', {'error': 'Invalid image data'})
            return
        image_rgb = cv2.cvtColor(image_np, cv2.COLOR_BGR2RGB)


        image_encoded = DeepFace.represent(
            image_rgb,
            model_name='Facenet',
            enforce_detection=False,
            detector_backend='opencv'
        )
        if not image_encoded:
            emit('scan_result',{'error': 'no face detected'})
            return
        
        for image in image_encoded:
            for person in cases_col.find():
                if 'encoded_image' not in person:
                    continue

                db_embedding = person['encoded_image']
                similarity = 1 - cosine(image['embedding'], db_embedding)

                if similarity >0.4:
                    emit('scan_result',{
                        'match': True,
                        'similarity': similarity,
                        'name': person.get('name'),
                        'age': person.get('age'),
                        'gender': person.get('gender'),
                        'last_seen': person.get('last_seen'),
                        'description': person.get('description'),
                        'location': person.get('location'),
                        'mobile': person.get('mobile'),
                        'email': person.get('email')
                    })

                    return
                emit('scan_result',{
                    'match':False
                })

    except Exception as e:
        traceback.print_exc()
        emit('scan_result', {'error': 'Server error from exception'})


        
