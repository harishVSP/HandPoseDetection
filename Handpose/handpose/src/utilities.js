 //points for fingers
const fingerJoints = {
    thumb: [0,1,2,3,4],
    indexFinger: [0,5,6,7,8],
    middleFinger: [0,9,10,11,12],
    ringFinger: [0,13,14,15,16],
    pinky: [0,17,18,19,20],
};
// Infinity Gauntlet Style
const style = {
    0: { color: "yellow", size: 15 },
    1: { color: "gold", size: 6 },
    2: { color: "green", size: 10 },
    3: { color: "gold", size: 6 },
    4: { color: "gold", size: 6 },
    5: { color: "purple", size: 10 },
    6: { color: "gold", size: 6 },
    7: { color: "gold", size: 6 },
    8: { color: "gold", size: 6 },
    9: { color: "blue", size: 10 },
    10: { color: "gold", size: 6 },
    11: { color: "gold", size: 6 },
    12: { color: "gold", size: 6 },
    13: { color: "red", size: 10 },
    14: { color: "gold", size: 6 },
    15: { color: "gold", size: 6 },
    16: { color: "gold", size: 6 },
    17: { color: "orange", size: 10 },
    18: { color: "gold", size: 6 },
    19: { color: "gold", size: 6 },
    20: { color: "gold", size: 6 },
  };


//drawing function
export const drawHand = (predictions, ctx)=>{
    //check if we have predictions
    if(predictions.length>0){
        //loop through each prediction
        predictions.forEach((prediction)=>{
            //grab landmarks
            const landmarks = prediction.landmarks;

            //loop throught the fingers
            for (let j=0; j<Object.keys(fingerJoints).length;j++){
                let finger = Object.keys(fingerJoints)[j];
                //loop throught the pairs of joints
                for(let k=0;k<fingerJoints[finger].length -1; k++){
                    //get pairs of joints
                    const firstJointIndex = fingerJoints[finger][k]; 
                    const secondJointIndex = fingerJoints[finger][k+1];
                    //draw path
                    ctx.beginPath();
                    ctx.moveTo(
                        landmarks[firstJointIndex][0],
                        landmarks[firstJointIndex][1],
                    );
                    ctx.lineTo(
                        landmarks[secondJointIndex][0],
                        landmarks[secondJointIndex][1],
                    )
                    ctx.strokeStyle = "gold"
                    ctx.lineWidth = 4
                    ctx.stroke()
            
                }
            }



            //loop through landmarks and draw them
            for (let i=0; i<landmarks.length; i++){
                //get x point
                const x = landmarks[i][0];
                //get y point
                const y = landmarks[i][1];
                //drawing
                ctx.beginPath();
                ctx.arc(x,y,style[i]["size"],0,3*Math.PI); //the 3rd value is the size of the dots in ur hand


                //set line color
                ctx.fillStyle = style[i]["color"];
                ctx.fill();
            }
        });
    } 
};