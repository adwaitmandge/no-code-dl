const router = require("express").Router();
const pool = require("../db");

router.post("/image-processing", async (req, res) => {
  try {
    console.log(req.body);
    const {
      projectName,
      user: { email, id },
    } = req.body;
    const {
      inputLayer,
      convoLayers: { convo2D },
      convoLayers: { convoT2D },
      activationLayer,
      poolingLayer: { maxPool, averagePool },
    } = req.body;

    const inputLayerData = await pool.query(
      "INSERT INTO input_layer_data(image_size, examples) VALUES($1, $2) RETURNING *",
      [inputLayer.imageSize, inputLayer.examples]
    );

    const inputID = inputLayerData.rows[0].id;
    console.log("Input layer data inserted");

    const { reLU, leakyReLU, signoid, tanH, sofmax } = activationLayer;
    const activationLayerData = await pool.query(
      "INSERT INTO activation_layer_data(relu, leaky_relu, signoid, sofmax, tanh) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [reLU, leakyReLU, signoid, sofmax, tanH]
    );

    console.log("Activation Layer Data inserted");
    const activationID = activationLayerData.rows[0].id;

    const convo2DData = await pool.query(
      "INSERT INTO convolution_2d_data(in_channel, out_channel, kernel_size, stride, padding) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [
        convo2D.inChannel,
        convo2D.outChannel,
        convo2D.kernelSize,
        convo2D.stride,
        convo2D.padding,
      ]
    );

    console.log("Covo2D layer data inserted");
    const convo2DID = convo2DData.rows[0].id;

    const convoT2DData = await pool.query(
      "INSERT INTO convolution_t2d_data(in_channel, out_channel, kernel_size, stride, padding) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [
        convoT2D.inChannel,
        convoT2D.outChannel,
        convoT2D.kernelSize,
        convoT2D.stride,
        convoT2D.padding,
      ]
    );
    console.log("CovoT2D layer data inserted");
    const convoT2DID = convoT2DData.rows[0].id;

    const maxPoolingData = await pool.query(
      "INSERT INTO max_pooling_data(kernel_size, stride, padding) VALUES($1, $2, $3) RETURNING *",
      [maxPool.kernelSize, maxPool.stride, maxPool.padding]
    );
    console.log("Max pooling ata inserted");

    const maxPoolingID = maxPoolingData.rows[0].id;

    const averagePoolingData = await pool.query(
      "INSERT INTO average_pooling_data(kernel_size, stride, padding) VALUES($1, $2, $3) RETURNING *",
      [averagePool.kernelSize, averagePool.stride, averagePool.padding]
    );

    console.log("Average Pooling data inserted");
    const averagePoolingID = averagePoolingData.rows[0].id;

    const imageProcessingData = await pool.query(
      "INSERT INTO image_processing_data(input_layer_id, activation_layer_id, convolution_2d_layer_id, convolution_t2d_layer_id, max_pooling_id, average_pooling_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        inputID,
        activationID,
        convo2DID,
        convoT2DID,
        maxPoolingID,
        averagePoolingID,
      ]
    );

    console.log("Every layer's data inserted");

    const imageDataID = imageProcessingData.rows[0].id;
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    const imageProcessingProjects = await pool.query(
      "INSERT INTO image_processing_project (user_id, project_name, created_at, last_updated, data) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [id, projectName, today, today, imageDataID]
    );

    console.log("Image Processing Project created");

    const imageProcessingProjectID = imageProcessingProjects.rows[0].id;
    const user = await pool.query(
      "UPDATE users SET image_processing_projects = $1 WHERE email=$2",
      [imageProcessingProjectID, email]
    );

    console.log("Project info added to user profile");
    res.json("DONE");
  } catch (err) {
    console.log("Error occured while inserting");
    console.error(err.message);
  }
});

module.exports = router;
