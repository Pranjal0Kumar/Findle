from flask import Blueprint, request
import numpy as np
import traceback
import cv2
from deepface import DeepFace
from data.config import cases_col
from scipy.spatial.distance import cosine

scan_bp = Blueprint('scan', __name__)
@scan_bp.route('/scan', methods=['POST'])
def scan():
    try:
        image  = request.files['image']
        if not image:   
            return {'error': 'No image provided'}, 400
        e_bytes = np.frombuffer(image.read(), np.uint8)
        image_np = cv2.imdecode(e_bytes, cv2.IMREAD_COLOR)
        image_rgb = cv2.cvtColor(image_np, cv2.COLOR_BGR2RGB)
        images_encoded = DeepFace.represent(image_rgb, model_name='Facenet', enforce_detection=False, detector_backend='opencv')
        if not images_encoded:
            return {'error': 'No face detected in the image'}, 400
        for image in images_encoded:
            for person in cases_col.find():
                if 'encoded_image' not in person:
                    continue  # skip this document
                db_embedding = person['encoded_image']
                similarity = 1- cosine(image['embedding'], db_embedding)
                print("Similarity with", person['name'], "=", similarity)
                if similarity > 0.7:
                    return {
                        'similarity': similarity,
                        'name': person.get('name'),
                        'age': person.get('age'),
                        'gender': person.get('gender'),
                        'last_seen': person.get('last_seen'),
                        'description': person.get('description'),
                        'location': person.get('location'),
                        'mobile': person.get('mobile'),
                        'email': person.get('email')
                    }
        return {
            'message': 'No match found',
            
            }, 200
    except Exception as e:
        print("ERROR: ",str(e))
        traceback.print_exc()
        return {'error':'server crashed'},500
