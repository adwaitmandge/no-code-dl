const router = require("express").Router();
const pool = require("../db");
const authorise = require("../middleware/authorisation");

router.get("/", authorise, async (req, res) => {
  try {
    //AFTER PASSING THE MIDDLEWARE, REQ.USER HAS THE PAYLOAD
    console.log("inside");
    console.log(req.user);
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [
      req.user,
    ]);

    if (user.rows.length === 0) {
      console.log(req.user);
      const user = await pool.query("SELECT * FROM google WHERE id=$1", [
        req.user,
      ]);
      res.json(user.rows[0]);
    } else {
      res.json(user.rows[0]);
    }
  } catch (err) {
    console.error(err.message);
    res.status(403).json("NOT AUTHORISED");
  }
});

router.get("/image-processing", authorise, async (req, res) => {
  try {
    //AFTER PASSING THE MIDDLEWARE, REQ.USER HAS THE PAYLOAD
    console.log("inside");
    console.log(req.user);
    const imageProcessingProjects = await pool.query(
      "SELECT * FROM users INNER JOIN image_processing_project ON users.id=image_processing_project.user_id WHERE users.id=$1",
      [req.user]
    );

    res.json(imageProcessingProjects.rows);
  } catch (err) {
    console.error(err.message);
    res.status(403).json("NOT AUTHORISED");
  }
});

router.get(
  "/image-processing/project-details/:id",
  authorise,
  async (req, res) => {
    try {
      console.log("Inside project-details");
      const { project_id: id } = req.headers;

      const input_layer_data = await pool.query(
        "SELECT input_layer_data.image_size, input_layer_data.examples FROM image_processing_project INNER JOIN image_processing_data ON image_processing_project.data = image_processing_data.id INNER JOIN input_layer_data ON image_processing_data.input_layer_id=input_layer_data.id WHERE image_processing_project.id=$1;",
        [id]
      );

      const activation_layer_data = await pool.query(
        "SELECT activation_layer_data.relu, activation_layer_data.leaky_relu, activation_layer_data.signoid, activation_layer_data.sofmax, activation_layer_data.tanh FROM image_processing_project INNER JOIN image_processing_data ON image_processing_project.data = image_processing_data.id INNER JOIN activation_layer_data ON image_processing_data.activation_layer_id=activation_layer_data.id WHERE image_processing_project.id=$1",
        [id]
      );

      const average_pooling_data = await pool.query(
        "SELECT average_pooling_data.kernel_size, average_pooling_data.stride, average_pooling_data.padding FROM image_processing_project INNER JOIN image_processing_data ON image_processing_project.data = image_processing_data.id INNER JOIN average_pooling_data ON image_processing_data.average_pooling_id=average_pooling_data.id WHERE image_processing_project.id=$1",
        [id]
      );

      const max_pooling_data = await pool.query(
        "SELECT max_pooling_data.kernel_sIze, max_pooling_data.stride, max_pooling_data.padding FROM image_processing_project INNER JOIN image_processing_data ON image_processing_project.data = image_processing_data.id INNER JOIN max_pooling_data ON image_processing_data.max_pooling_id=max_pooling_data.id WHERE image_processing_project.id=$1;",
        [id]
      );

      const convolution_2d_data = await pool.query(
        "SELECT convolution_2d_data.kernel_size, convolution_2d_data.stride, convolution_2d_data.padding, convolution_2d_data.in_channel, convolution_2d_data.out_channel FROM image_processing_project INNER JOIN image_processing_data ON image_processing_project.data = image_processing_data.id INNER JOIN convolution_2d_data ON image_processing_data.convolution_2d_layer_id=convolution_2d_data.id WHERE image_processing_project.id=$1;",
        [id]
      );

      const convolution_t2d_data = await pool.query(
        "SELECT convolution_t2d_data.kernel_size, convolution_t2d_data.stride, convolution_t2d_data.padding, convolution_t2d_data.in_channel, convolution_t2d_data.out_channel FROM image_processing_project INNER JOIN image_processing_data ON image_processing_project.data = image_processing_data.id INNER JOIN convolution_t2d_data ON image_processing_data.convolution_t2d_layer_id=convolution_t2d_data.id WHERE image_processing_project.id=$1",
        [id]
      );

      const username = await pool.query(
        "SELECT username FROM users WHERE id=$1",
        [req.user]
      );
      const projectName = await pool.query(
        "SELECT project_name FROM image_processing_project WHERE id=$1",
        [id]
      );

      const data = {
        inputLayer: { ...input_layer_data.rows[0] },
        activationLayer: { ...activation_layer_data.rows[0] },
        convoLayers: {
          convo2D: { ...convolution_2d_data.rows[0] },
          convoT2D: { ...convolution_t2d_data.rows[0] },
        },
        poolingLayer: {
          maxPool: { ...max_pooling_data.rows[0] },
          averagePool: { ...average_pooling_data.rows[0] },
        },
        username: username.rows[0],
        projectName: projectName.rows[0],
      };
      console.log(data);
      res.json(data);
    } catch (err) {
      console.error(err.message);
    }
  }
);

router.patch("/image-processing/project-details/:id", async (req, res) => {
  try {
    console.log("Inside the patch route");
    const { body } = req;
    console.log(body);
    console.log("About to retrieve id");
    const projectDataID = await pool.query(
      "SELECT data FROM image_processing_project WHERE id = $1",
      [body.project_id]
    );
    console.log(projectDataID);
    const layers_id = await pool.query(
      "SELECT * FROM image_processing_data WHERE id=$1",
      [projectDataID.rows[0].data]
    );
    console.log(layers_id);
    const input_layer_id = layers_id.rows[0].input_layer_id;
    const activation_layer_id = layers_id.rows[0].activation_layer_id;
    const convolution_2d_layer_id = layers_id.rows[0].convolution_2d_layer_id;
    const convolution_t2d_layer_id = layers_id.rows[0].convolution_t2d_layer_id;
    const max_pooling_layer_id = layers_id.rows[0].max_pooling_id;
    const average_pooling_layer_id = layers_id.rows[0].average_pooling_id;

    const input_layer_update = await pool.query(
      "UPDATE input_layer_data SET image_size=$1, examples=$2 WHERE id=$3",
      [body.inputLayer.image_size, body.inputLayer.examples, input_layer_id]
    );
    console.log("Input layer updated");

    const activation_layer_update = await pool.query(
      "UPDATE activation_layer_data SET relu=$1, leaky_relu=$2, signoid=$3, sofmax=$4, tanh=$5 WHERE id=$6",
      [
        body.activationLayer.relu,
        body.activationLayer.leaky_relu,
        body.activationLayer.signoid,
        body.activationLayer.sofmax,
        body.activationLayer.tanh,
        activation_layer_id,
      ]
    );

    console.log("Activation layer updated");

    const convolution_2d_update = await pool.query(
      "UPDATE convolution_2d_data SET kernel_size=$1, stride=$2, padding=$3, in_channel=$4, out_channel=$5 WHERE id=$6",
      [
        body.convoLayers.convo2D.kernel_size,
        body.convoLayers.convo2D.stride,
        body.convoLayers.convo2D.padding,
        body.convoLayers.convo2D.in_channel,
        body.convoLayers.convo2D.out_channel,
        convolution_2d_layer_id,
      ]
    );

    console.log("Convo 2d layer updated");

    const convolution_t2d_update = await pool.query(
      "UPDATE convolution_t2d_data SET kernel_size=$1, stride=$2, padding=$3, in_channel=$4, out_channel=$5 WHERE id=$6",
      [
        body.convoLayers.convoT2D.kernel_size,
        body.convoLayers.convoT2D.stride,
        body.convoLayers.convoT2D.padding,
        body.convoLayers.convoT2D.in_channel,
        body.convoLayers.convoT2D.out_channel,
        convolution_t2d_layer_id,
      ]
    );

    console.log("Convo t2d layer updated");

    const max_pooling_layer_update = await pool.query(
      "UPDATE max_pooling_data SET kernel_size=$1, stride=$2, padding=$3 WHERE id=$4",
      [
        body.poolingLayer.maxPool.kernel_size,
        body.poolingLayer.maxPool.stride,
        body.poolingLayer.maxPool.padding,
        max_pooling_layer_id,
      ]
    );

    console.log("Max POOl layer updated");
    console.log(max_pooling_layer_update);

    const average_pooling_layer_update = await pool.query(
      "UPDATE average_pooling_data SET kernel_size=$1, stride=$2, padding=$3 WHERE id=$4",
      [
        body.poolingLayer.averagePool.kernel_size,
        body.poolingLayer.averagePool.stride,
        body.poolingLayer.averagePool.padding,
        average_pooling_layer_id,
      ]
    );

    console.log("Average Pool updated");
    res.json("PROJECT DETAILS UPDATED!");
  } catch (err) {
    console.error(err.message);
  }
});

router.delete("/image-processing/:id", async (req, res) => {
  console.log(req.params);
  console.log("Inside the delete request");
  const { id: project_id } = req.params;
  const dataID = await pool.query(
    "SELECT data from image_processing_project WHERE id=$1",
    [project_id]
  );

  console.log(dataID);
  const layers_id = await pool.query(
    "SELECT input_layer_id, activation_layer_id, convolution_2d_layer_id,convolution_t2d_layer_id, max_pooling_id, average_pooling_id from image_processing_data WHERE id=$1",
    [dataID.rows[0].data]
  );

  const delete_project = await pool.query(
    "DELETE FROM image_processing_project WHERE id=$1",
    [project_id]
  );

  const delete_data = await pool.query(
    "DELETE FROM image_processing_data WHERE id=$1",
    [dataID.rows[0].data]
  );

  console.log(layers_id);
  const deleted_input_layer = await pool.query(
    "DELETE FROM input_layer_data WHERE id=$1",
    [layers_id.rows[0].input_layer_id]
  );

  const deleted_activation_layer = await pool.query(
    "DELETE FROM activation_layer_data WHERE id=$1",
    [layers_id.rows[0].activation_layer_id]
  );

  const deleted_convo2d_layer = await pool.query(
    "DELETE FROM convolution_2d_data WHERE id=$1",
    [layers_id.rows[0].convolution_2d_layer_id]
  );

  const deleted_convot2d_layer = await pool.query(
    "DELETE FROM convolution_t2d_data WHERE id=$1",
    [layers_id.rows[0].convolution_t2d_layer_id]
  );

  const deleted_maxPool = await pool.query(
    "DELETE FROM max_pooling_data WHERE id=$1",
    [layers_id.rows[0].max_pooling_id]
  );

  const deleted_averagePool = await pool.query(
    "DELETE FROM max_pooling_data WHERE id=$1",
    [layers_id.rows[0].average_pooling_id]
  );

  res.json("DELETED ALL LAYERS");
});

module.exports = router;
