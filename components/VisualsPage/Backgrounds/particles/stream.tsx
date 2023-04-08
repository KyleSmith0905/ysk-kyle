const streamGenerator = () => {

  return {
    startAngle: 0,
    angleSqueeze: Math.PI * 2,
    mousePosition: [0, 0] as [number, number],
    globalTransformDrift: [Math.random() * 1000, Math.random() * 1000] as [number, number],
    animate: function() {
      this.angleSqueeze = Math.max(0.02, this.angleSqueeze * 0.99);
      this.globalTransformDrift = [this.globalTransformDrift[0] + 0.0015, this.globalTransformDrift[1] + 0.0015];
    },
  };
};

export { streamGenerator };