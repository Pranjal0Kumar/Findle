from flask import Blueprint, request, jsonify
import smtplib
from email.message import EmailMessage

email_bp = Blueprint('mail', __name__)

@email_bp.route('/mail', methods=['POST'])
def mail():
    try:
        data = request.get_json(force=True)
        if not data:
            return jsonify({"error": "Missing 'name' in request"}), 400
        # Validate required fields
        if not all(k in data for k in ('to', 'body')):
            return jsonify({'status': 'error', 'message': 'Missing "to" or "body" field'}), 400

        msg = EmailMessage()
        msg.set_content(data['body'])
        msg['Subject'] = f"Hello {data.get('name', 'User')}! Your scan was successful"
        msg['From'] = 'pranjalk3791.email@gmail.com'
        msg['To'] = data['to']

        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.login('pranjalk3791@gmail.com', 'akgo thqf higz fzph')
        server.send_message(msg)
        server.quit()

        return jsonify({'status': 'sent'}), 200
    except Exception as e:
        print("EMAIL SEND ERROR:", str(e))  # <-- Add this line
        return jsonify({'status': 'error', 'message': str(e)}), 500
