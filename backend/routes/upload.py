from flask import Blueprint, request
from deepface import DeepFace
from data.config import cases_col
import numpy as np
from flask import send_file
from PIL import Image, ImageDraw, ImageFont
import io
import cv2
import os
 

upload_bp = Blueprint('upload', __name__)

@upload_bp.route('/register-missing', methods=['POST'])
def register_missing():
    image = request.files['image']
    name = request.form['name']
    age = request.form['age']
    gender = request.form['gender']
    last_seen = request.form['last_seen']
    description = request.form['description']
    location = request.form['location']
    mobile = request.form['mobile']
    email = request.form['email']

    
    file_bytes = image.read()
    np_arr = np.frombuffer(file_bytes, np.uint8)
    image_np = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    os.makedirs('uploads', exist_ok=True)
    with open('uploads/ss.jpg', 'wb') as f:
        f.write(file_bytes)



    encoded_image = DeepFace.represent(image_np,model_name='Facenet', enforce_detection=True)

    case = {
        'image':'uploads/ss.jpg',
        'encoded_image': encoded_image[0]['embedding'],
        'name':name,
        'age':age,
        'gender':gender,
        'last_seen':last_seen,
        'description':description,
        'location':location,
        'mobile': mobile,
        'email': email
    }
    face_image = Image.open('uploads/ss.jpg').convert('RGB')
    face_image = face_image.resize((200, 200))

    os.remove('uploads/ss.jpg')
    
    result = cases_col.insert_one(case)

    poster = Image.new('RGB', (600, 800), color='white')
    draw = ImageDraw.Draw(poster)
    font = ImageFont.load_default()
    poster.paste(face_image, (200, 150))
    y = 30  
    draw.text((30, y), f"🚨 MISSING PERSON 🚨", font=font, fill='red')
    y += 50
    draw.text((30, y), f"Name: {name}", font=font, fill='black'); y += 30
    draw.text((30, y), f"Age: {age}", font=font, fill='black'); y += 30
    draw.text((30, y), f"Gender: {gender}", font=font, fill='black'); y += 30
    draw.text((30, y), f"Last Seen: {last_seen}", font=font, fill='black'); y += 30
    draw.text((30, y), f"Location: {location}", font=font, fill='black'); y += 30
    draw.text((30, y), f"Description: {description}", font=font, fill='black'); y += 60

    draw.text((30, y), "If seen, contact us at findle.org", font=font, fill='blue')

    img_io = io.BytesIO()
    poster.save(img_io, 'JPEG', quality=95)
    img_io.seek(0)
    return send_file(img_io, mimetype='image/jpeg', as_attachment=True, download_name='missing_poster.jpg')

