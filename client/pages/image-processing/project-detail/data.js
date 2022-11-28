const sampleData = [
  {
    id: 1,
    image: {
      imageSize: 43,
      examples: 23,
    },
    convoLayers: {
      convo2D: {
        inChannel: 12,
        outChannel: 121,
        kernelSize: 19,
        stride: 13,
        padding: 23,
      },
      convoT2D: {
        inChannel: 83,
        outChannel: 11,
        kernelSize: 71,
        stride: 57,
        padding: 29,
      },
    },
    activationLayer: {
      reLU: 39,
      leakyReLU: 17,
      signoid: 43,
      tanH: 12,
      sofmax: 14,
    },
    poolingLayer: {
      maxPool: {
        kernelSize: 67,
        stride: 46,
        padding: 68,
      },
      averagePool: {
        kernelSize: 37,
        stride: 52,
        padding: 18,
      },
    },
  },
  {
    id: 2,
    image: {
      imageSize: 13,
      examples: 89,
    },
    convoLayers: {
      convo2D: {
        inChannel: 47,
        outChannel: 16,
        kernelSize: 90,
        stride: 15,
        padding: 97,
      },
      convoT2D: {
        inChannel: 3,
        outChannel: 1,
        kernelSize: 76,
        stride: 90,
        padding: 10,
      },
    },
    activationLayer: {
      reLU: 13,
      leakyReLU: 73,
      signoid: 40,
      tanH: 11,
      sofmax: 85,
    },
    poolingLayer: {
      maxPool: {
        kernelSize: 19,
        stride: 12,
        padding: 15,
      },
      averagePool: {
        kernelSize: 42,
        stride: 65,
        padding: 78,
      },
    },
  },
  {
    id: 3,
    image: {
      imageSize: 91,
      examples: 104,
    },
    convoLayers: {
      convo2D: {
        inChannel: 117,
        outChannel: 130,
        kernelSize: 52,
        stride: 56,
        padding: 70,
      },
      convoT2D: {
        inChannel: 84,
        outChannel: 98,
        kernelSize: 112,
        stride: 126,
        padding: 140,
      },
    },
    activationLayer: {
      reLU: 15,
      leakyReLU: 30,
      signoid: 45,
      tanH: 60,
      sofmax: 75,
    },
    poolingLayer: {
      maxPool: {
        kernelSize: 90,
        stride: 105,
        padding: 120,
      },
      averagePool: {
        kernelSize: 135,
        stride: 150,
        padding: 16,
      },
    },
  },
  {
    id: 4,
    image: {
      imageSize: 32,
      examples: 48,
    },
    convoLayers: {
      convo2D: {
        inChannel: 64,
        outChannel: 80,
        kernelSize: 96,
        stride: 112,
        padding: 128,
      },
      convoT2D: {
        inChannel: 144,
        outChannel: 160,
        kernelSize: 17,
        stride: 34,
        padding: 51,
      },
    },
    activationLayer: {
      reLU: 68,
      leakyReLU: 85,
      signoid: 102,
      tanH: 119,
      sofmax: 131,
    },
    poolingLayer: {
      maxPool: {
        kernelSize: 148,
        stride: 165,
        padding: 18,
      },
      averagePool: {
        kernelSize: 36,
        stride: 54,
        padding: 72,
      },
    },
  },
];

export default sampleData;
