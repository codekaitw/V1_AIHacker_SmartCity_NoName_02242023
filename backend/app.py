from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import random
import numpy as np
app = Flask(__name__)
CORS(app)

pred = pd.read_csv('output.txt', sep='\t', header=None, names=['image_names', 'emergency_or_not'])

#print(pred)

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    input_number = data.get('numbers')
    #top, left, right, bottom
    input_number_top = int(input_number[0])
    input_number_left = int(input_number[1])
    input_number_right = int(input_number[2])
    input_number_bottom = int(input_number[3])
    
    img_top = np.random.randint(0, 705, input_number_top)
    img_left = np.random.randint(0, 705, input_number_left)
    img_right = np.random.randint(0, 705, input_number_right)
    img_bottom = np.random.randint(0, 705, input_number_bottom)
    

    emergencyWeights = 5
    normalWeights = 1

    xRoadWeights = 0
    yRoadWeights = 0
    top_img_names = []
    top_weights = []
    for i in img_top:
        top_img_names.append(pred.iloc[i].image_names)
        top_wei = pred.iloc[i].emergency_or_not
        if top_wei >= 0.9:
            yRoadWeights += emergencyWeights
        else:
            yRoadWeights += normalWeights
        #top_weights.append(pred.iloc[i].emergency_or_not)

    left_img_names = []
    left_weights = []
    for i in img_left:
        left_img_names.append(pred.iloc[i].image_names)
        left_wei = pred.iloc[i].emergency_or_not
        if left_wei >= 0.9:
            xRoadWeights += emergencyWeights
        else:
            xRoadWeights += normalWeights


    right_img_names = []
    right_weights = []
    for i in img_right:
        right_img_names.append(pred.iloc[i].image_names)
        right_wei = pred.iloc[i].emergency_or_not
        if right_wei >= 0.9:
            xRoadWeights += emergencyWeights
        else:
            xRoadWeights += normalWeights

    bottom_img_names = []
    bottom_weights = []
    for i in img_bottom:
        bottom_img_names.append(pred.iloc[i].image_names)
        bottom_wei = pred.iloc[i].emergency_or_not
        if bottom_wei >= 0.9:
            yRoadWeights += emergencyWeights
        else:
            yRoadWeights += normalWeights


    for i in top_weights:
        if(top_weights[i] >= 0.9):
            yRoadWeights += emergencyWeights
        else:
            yRoadWeights += normalWeights
    
    for i in bottom_weights:
        if(bottom_weights[i] >= 0.9):
            yRoadWeights += emergencyWeights
        else:
            yRoadWeights += normalWeights
    
    for i in left_weights:
        if(left_weights[i] >= 0.9):
            xRoadWeights += emergencyWeights
        else:
            xRoadWeights += normalWeights
    
    for i in right_weights:
        if(right_weights[i] >= 0.9):
            xRoadWeights += emergencyWeights
        else:
            xRoadWeights += normalWeights

    result = {
    'top': top_img_names,
    'left': left_img_names,
    'right': right_img_names,
    'bottom': bottom_img_names,
    'xRoad': xRoadWeights,
    'yRoad': yRoadWeights
    }
    return jsonify({'result': result})
    
    #if input_number is None:
    #    return jsonify({'error': 'Please provide a number'}), 400


if __name__ == '__main__':
    app.run(debug=True)
