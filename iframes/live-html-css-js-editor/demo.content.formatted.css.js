const cssFormatted = `* {
  box-sizing: border-box;
}

#text {
  color: white;
  position: absolute;
  border-right: 1px solid;
  border-bottom: 1px solid;
  padding: 20px 20px 20px 0;
  top: 50%;
  left: 50%;
  transform: translateX(-46px) translateY(150px);
  text-align: right;
}
#subtitle {
  display: block;
}

#circleContainer {
  position: absolute;
  width: 283px;
  height: 283px;
  border: 1px solid #00a1cb;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  transform-style: preserve-3d;
}

#circleFrame {
  position: absolute;
  width: 143px;
  height: 143px;
  border: 1px solid #00a1cb;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  transform-style: preserve-3d;
}

.circle {
  border: 1px solid #00a1cb;
  height: 20%;
  width: 20%;
  border-radius: 50%;
  position: absolute;
  perspective: 800px;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  left: 50%;
}

#circleContainer2 {
  position: absolute;
  width: 500px;
  height: 500px;
  border: 1px solid #000;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  transform-style: preserve-3d;
}

.circle2 {
  border: 1px solid white;
  height: 10%;
  width: 10%;
  border-radius: 50%;
  position: absolute;
  perspective: 800px;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  left: 50%;
}

body {
  background: #000;
}

#circle1 {
  animation: circle1 15s infinite;
}

@keyframes circle1 {
  0% {
    width: 0px;
    transform: translateX(-50%) translateY(-50%) rotateX(0deg) rotateY(0deg)
      rotateZ(0deg);
  }
  50% {
    width: 120px;
    transform: translateX(-50%) translateY(-50%) rotateX(720deg) rotateY(0deg)
      rotateZ(0deg);
  }
  100% {
    width: 0px;
    transform: translateX(-50%) translateY(-50%) rotateX(0deg) rotateY(0deg)
      rotateZ(0deg);
  }
}

#circle2 {
  animation: circle2 25s infinite;
}

@keyframes circle2 {
  0% {
    width: 0px;
    transform: translateX(-50%) translateY(-50%) rotateX(0deg) rotateY(0deg)
      rotateZ(0deg);
  }
  50% {
    width: 120px;
    transform: translateX(-50%) translateY(-50%) rotateX(0deg) rotateY(-720deg)
      rotateZ(0deg);
  }
  100% {
    width: 0px;
    transform: translateX(-50%) translateY(-50%) rotateX(0deg) rotateY(0deg)
      rotateZ(0deg);
  }
}

#circle3 {
  animation: circle3 25s infinite;
}

@keyframes circle3 {
  0% {
    width: 0px;
    transform: translateX(-50%) translateY(-50%) rotateX(0deg) rotateY(0deg)
      rotateZ(0deg);
  }
  50% {
    width: 120px;
    transform: translateX(-50%) translateY(-50%) rotateX(0deg) rotateY(0deg)
      rotateZ(720deg);
  }
  100% {
    width: 0px;
    transform: translateX(-50%) translateY(-50%) rotateX(0deg) rotateY(0deg)
      rotateZ(0deg);
  }
}

#circle4 {
  animation: circle4 25s infinite;
}

@keyframes circle4 {
  0% {
    width: 0px;
    transform: translateX(-50%) translateY(-50%) rotateX(0deg) rotateY(0deg)
      rotateZ(0deg);
  }
  50% {
    width: 120px;
    transform: translateX(-50%) translateY(-50%) rotateX(0deg) rotateY(720deg)
      rotateZ(720deg);
  }
  100% {
    width: 0px;
    transform: translateX(-50%) translateY(-50%) rotateX(0deg) rotateY(0deg)
      rotateZ(0deg);
  }
}

#circle5 {
  animation: circle5 25s infinite;
}

@keyframes circle5 {
  0% {
    width: 0px;
    transform: translateX(-50%) translateY(-50%) rotateX(0deg) rotateY(0deg)
      rotateZ(0deg);
  }
  50% {
    width: 120px;
    transform: translateX(-50%) translateY(-50%) rotateX(720deg) rotateY(720deg)
      rotateZ(0deg);
  }
  100% {
    width: 0px;
    transform: translateX(-50%) translateY(-50%) rotateX(0deg) rotateY(0deg)
      rotateZ(0deg);
  }
}

#circle6 {
  animation: circle6 25s infinite;
}

@keyframes circle6 {
  0% {
    width: 0px;
    transform: translateX(-50%) translateY(-50%) rotateX(0deg) rotateY(0deg)
      rotateZ(0deg);
  }
  50% {
    width: 120px;
    transform: translateX(-50%) translateY(-50%) rotateX(720deg) rotateY(0deg)
      rotateZ(720deg);
  }
  100% {
    width: 0px;
    transform: translateX(-50%) translateY(-50%) rotateX(0deg) rotateY(0deg)
      rotateZ(0deg);
  }
}

#circle7 {
  width: 50%;
  height: 50%;
}

#circle7 {
  animation: circle7 25s infinite;
}

@keyframes circle7 {
  0% {
    width: 0px;
    transform: translateX(-50%) translateY(-50%) rotateX(0deg) rotateY(0deg)
      rotateZ(0deg);
  }
  50% {
    width: 120px;
    transform: translateX(-50%) translateY(-50%) rotateX(720deg) rotateY(0deg)
      rotateZ(0deg);
  }
  100% {
    width: 0px;
    transform: translateX(-50%) translateY(-50%) rotateX(0deg) rotateY(0deg)
      rotateZ(0deg);
  }
}

#circle8 {
  width: 30%;
  height: 30%;
}

#circle8 {
  animation: circle8 25s infinite;
}

@keyframes circle8 {
  0% {
    width: 0px;
    transform: translateX(-50%) translateY(-50%) rotateX(0deg) rotateY(0deg)
      rotateZ(0deg);
  }
  50% {
    width: 120px;
    transform: translateX(-50%) translateY(-50%) rotateX(0deg) rotateY(720deg)
      rotateZ(0deg);
  }
  100% {
    width: 0px;
    transform: translateX(-50%) translateY(-50%) rotateX(0deg) rotateY(0deg)
      rotateZ(0deg);
  }
}`