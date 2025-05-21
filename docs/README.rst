🕵️‍♂️ Computer Vision Cheating Detection System
==============================================

Detect suspicious behaviors in exam environments using AI.  
This project leverages object detection models trained on custom datasets to identify cheating attempts in real-time.

📊 Dataset: Trained using Roboflow  
🧠 Model: YOLOv5 / YOLOv8

.. image:: docs/demo.gif
   :alt: Demo of cheating detection
   :align: center
   :width: 600px

🚀 Features
-----------

- 📱 Detects phone usage during exams  
- 📄 Identifies hidden notes  
- 👥 Tracks person-to-object interactions  
- Adjustable confidence threshold  
- Real-time detection using webcam or video input  
- Exportable detection logs (CSV or JSON)  
- Easy integration into proctoring systems

⚙️ Technical Stack
------------------

+-------------------+---------------------+
| Component         | Technology          |
+===================+=====================+
| Model Training    | Roboflow            |
+-------------------+---------------------+
| Object Detection  | YOLOv5 / YOLOv8     |
+-------------------+---------------------+
| Inference Engine  | OpenCV              |
+-------------------+---------------------+
| Backend           | Python              |
+-------------------+---------------------+

📦 Installation
---------------

Clone the repository and install the dependencies:

.. code-block:: bash

   git clone https://github.com/yourusername/cheating-detection.git
   cd cheating-detection
   pip install -r requirements.txt

📂 Directory Structure
----------------------

.. code-block:: text

   cheating-detection/
   ├── detect.py
   ├── models/
   ├── data/
   ├── logs/
   ├── requirements.txt
   └── README.rst

🚀 Usage
--------

Run detection in real-time with your webcam:

.. code-block:: bash

   python detect.py --source 0 --weights models/best.pt --conf 0.5

To analyze a video file:

.. code-block:: bash

   python detect.py --source path/to/video.mp4 --weights models/best.pt

📁 Output
---------

All detections are logged to the `logs/` directory in CSV and JSON formats.

🤝 Contributing
---------------

Contributions are welcome!  
Please open an issue or submit a pull request.

📜 License
----------

This project is licensed under the MIT License.

🌐 Documentation
----------------

Coming soon: https://cheating.readthedocs.io
