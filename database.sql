CREATE EXTENSION
IF NOT EXISTS "uuid-ossp";

CREATE TABLE input_layer_data
(
    id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    image_size INTEGER,
    examples INTEGER
);

CREATE TABLE activation_layer_data
(
    id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    relu INTEGER ,
    leaky_relu INTEGER ,
    signoid INTEGER ,
    sofmax INTEGER ,
    tanh INTEGER
);

CREATE TABLE convolution_2d_data
(
    id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    kernel_size INTEGER ,
    stride INTEGER ,
    padding INTEGER ,
    in_channel INTEGER ,
    out_channel INTEGER
);

CREATE TABLE convolution_t2d_data
(
    id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    kernel_size INTEGER  ,
    stride INTEGER ,
    padding INTEGER ,
    in_channel INTEGER  ,
    out_channel INTEGER
);

CREATE TABLE max_pooling_data
(
    id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    kernel_sIze INTEGER ,
    stride INTEGER ,
    padding INTEGER
);

CREATE TABLE average_pooling_data
(
    id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    kernel_size INTEGER ,
    stride INTEGER ,
    padding INTEGER
);

CREATE TABLE image_processing_data
(
    id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    input_layer_id uuid REFERENCES input_layer_data(id),
    activation_layer_id uuid REFERENCES activation_layer_data(id),
    convolution_2d_layer_id uuid REFERENCES convolution_2d_data(id),
    convolution_t2d_layer_id uuid REFERENCES convolution_t2d_Data(id),
    max_pooling_id uuid REFERENCES max_pooling_data(id),
    average_pooling_id uuid REFERENCES average_pooling_data(id)
);

CREATE TABLE snn_data
(
    id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY
);

CREATE TABLE rnn_data
(
    id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY
);

CREATE TABLE collaborator
(
    id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    name VARCHAR(100) ,
    email VARCHAR(100) ,
    access_type VARCHAR(100)
);

CREATE TABLE image_processing_project
(
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    project_name VARCHAR(100),
    created_at DATE ,
    last_updated DATE ,
    data uuid REFERENCES image_processing_data(id) ,
    collaborators uuid REFERENCES collaborator(id)
);

CREATE TABLE snn
(
    id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    project_name VARCHAR(100) ,
    created_at DATE ,
    last_updated VARCHAR(100) ,
    data uuid REFERENCES snn_data(id) ,
    collaborators uuid REFERENCES collaborator(id)
);

CREATE TABLE rnn
(
    id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    project_name VARCHAR(100) ,
    created_at DATE ,
    last_updated DATE ,
    data uuid REFERENCES rnn_data(id) ,
    collaborators uuid REFERENCES collaborator(id)
);

CREATE TABLE users
(
    id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY ,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    image_processing_projects uuid,
    snn_projects uuid REFERENCES snn(id) ,
    rnn_projects uuid REFERENCES rnn(id)
);

CREATE TABLE google
(
    id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY ,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

-- CREATE TABLE people
-- (
--     name VARCHAR(100) NOT NULL,
--     age int NOT NULL
-- );

-- CREATE TABLE properties
-- (
--     name VARCHAR(100) NOT NULL,
--     prop VARCHAR(100) NOT NULL
-- );

-- insert into people(name, age) VALUES('Jane', 27);
-- insert into people(name, age) VALUES('John', 27);
-- insert into people(name, age) VALUES('Jim', 27);

-- insert into properties(name, prop) VALUES('Jane', 'Smart');
-- insert into properties(name, prop) VALUES('Jane', 'Funny');
-- insert into properties(name, prop) VALUES('Jane', 'Good-Looking');

-- SELECT image_processing_project.project_name,image_processing_data.id, image_processing_data.input_layer_id, input_layer_data.image_size, input_layer_data.examples FROM image_processing_project INNER JOIN image_processing_data ON image_processing_project.data = image_processing_data.id INNER JOIN input_layer_data ON image_processing_data.input_layer_id=input_layer_data.id WHERE image_processing_project.id='3ea542cb-376f-4b5a-9a13-2718816edca9';

-- SELECT image_processing_project.project_name,image_processing_data.id, image_processing_data.activation_layer_id, activation_layer_data.relu, activation_layer_data.leaky_relu, activation_layer_data.signoid, activation_layer_data.sofmax, activation_layer_data.tanh FROM image_processing_project INNER JOIN image_processing_data ON image_processing_project.data = image_processing_data.id INNER JOIN activation_layer_data ON image_processing_data.activation_layer_id=activation_layer_data.id WHERE image_processing_project.id='3ea542cb-376f-4b5a-9a13-2718816edca9';

-- SELECT image_processing_project.project_name,image_processing_data.id, image_processing_data.average_pooling_id, average_pooling_data.kernel_size, average_pooling_data.stride, average_pooling_data.padding FROM image_processing_project INNER JOIN image_processing_data ON image_processing_project.data = image_processing_data.id INNER JOIN average_pooling_data ON image_processing_data.average_pooling_id=average_pooling_data.id WHERE image_processing_project.id='3ea542cb-376f-4b5a-9a13-2718816edca9';

-- SELECT image_processing_project.project_name,image_processing_data.id, image_processing_data.max_pooling_id, max_pooling_data.kernel_sIze, max_pooling_data.stride, max_pooling_data.padding FROM image_processing_project INNER JOIN image_processing_data ON image_processing_project.data = image_processing_data.id INNER JOIN max_pooling_data ON image_processing_data.max_pooling_id=max_pooling_data.id WHERE image_processing_project.id='3ea542cb-376f-4b5a-9a13-2718816edca9';

-- SELECT image_processing_project.project_name,image_processing_data.id, image_processing_data.convolution_2d_layer_id, convolution_2d_data.kernel_size, convolution_2d_data.stride, convolution_2d_data.padding, convolution_2d_data.in_channel, convolution_2d_data.out_channel FROM image_processing_project INNER JOIN image_processing_data ON image_processing_project.data = image_processing_data.id INNER JOIN convolution_2d_data ON image_processing_data.convolution_2d_layer_id=convolution_2d_data.id WHERE image_processing_project.id='3ea542cb-376f-4b5a-9a13-2718816edca9';

-- SELECT image_processing_project.project_name, convolution_t2d_data.kernel_size, convolution_t2d_data.stride, convolution_t2d_data.padding, convolution_t2d_data.in_channel, convolution_t2d_data.out_channel FROM image_processing_project INNER JOIN image_processing_data ON image_processing_project.data = image_processing_data.id INNER JOIN convolution_t2d_data ON image_processing_data.convolution_t2d_layer_id=convolution_t2d_data.id WHERE image_processing_project.id='3ea542cb-376f-4b5a-9a13-2718816edca9';