//next
import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.scss";

//react
import React, { useEffect, useState, useRef } from "react";

//tensorflow
import * as tf from "@tensorflow/tfjs";

//classes
import { classes, classes_icon } from "../classes.js";

//components
import Loader from "@/components/loader/loader.js";
import Layout from "@/components/layout/layout.js";

import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

export default function Home() {
  const [model, setModel] = useState();
  const [prediction, setPrediction] = useState(null);
  const [img, setImg] = useState();
  const [preview, setPreview] = useState();
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const loadModel = async () => {
      const model = await tf.loadGraphModel("model/model.json");
      setModel(model);
    };
    loadModel();
  }, []);

  const Prediction = (img) => {
    img = tf.expandDims(tf.image.resizeBilinear(img, [224, 224]));
    let pred = model.predict(img);
    let predarray = Array.from(pred.dataSync());
    pred = predarray.indexOf(Math.max(...predarray));
    setPrediction(classes[pred]);
  };

  const handleChange = (file) => {
    setPreview(URL.createObjectURL(file));
    var img = new Image();
    img.src = `${URL.createObjectURL(file)}`;
    img.onload = () => {
      var output = tf.browser.fromPixels(img);
      setImg(output);
    };
  };

  return (
    <>
      <Head>
        <title>Food Vision</title>
        <meta name="description" content="101 foor categories classifier" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/see.png" />
      </Head>
      <main className={styles.main}>
        {model ? (
          <Layout>
            <>
              <div className={styles.header}>
                <h1>Food Vision®</h1>
                <a
                  className={styles.github}
                  href="https://github.com/ahmed-elmeskyny/Food-vision-web-app"
                >
                  <div className={styles.logo}>
                    <img src="/github-white.png" width="18px"></img>
                  </div>
                  <div className={styles.text}>Open in Github</div>
                </a>
              </div>

              <div className={styles.labels}>
                <h2>50+ Label Categories</h2>

                <div className={styles.labelsContainer}>
                  {classes_icon.map((label) => (
                    <div className={styles.label} key={label.title}>
                      <div className={styles.img}>
                        <img src={label.icon} width="45px"></img>
                      </div>
                      <p>{label.title}</p>
                    </div>
                  ))}
                </div>
                <span>
                  Upload an image of a food dish and let the model tell you what
                  it is{" "}
                </span>
              </div>

              {prediction ? (
                <div className={styles.predictionContainer}>
                  <div className={styles.prediction}>
                    <p>&quot;{prediction}&quot;</p>
                    <div className={styles.buttons}>
                      <button
                        className={styles.correct}
                        onClick={() => {
                          setImg();
                          setPrediction();
                          setPreview();
                        }}
                      >
                        Correct
                      </button>
                      <button
                        className={styles.incorrect}
                        onClick={() => {
                          setImg();
                          setPrediction();
                          setPreview();
                        }}
                      >
                        Incorrect
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.formContainer}>
                  <FileUploader
                    handleChange={handleChange}
                    name="file"
                    multiple={false}
                    types={fileTypes}
                  >
                    {preview ? (
                      <div className={styles.previewfile}>
                        <img src={preview} height="200px"></img>
                        <p>File uploaded successfully</p>
                      </div>
                    ) : (
                      <div className={styles.inputfile}>
                        <p>Click or Drop image here</p>
                        <p>Only JPG , JPEG Allowed !</p>
                      </div>
                    )}
                  </FileUploader>
                  <button
                    onClick={() => {
                      Prediction(img);
                    }}
                  >
                    What is it ?
                  </button>
                </div>
              )}

              <div className={styles.footer}>
                <p>
                  By
                  <a href="https://ahmedelmeskyny.vercel.app/">
                    Ahmed El Meskyny
                  </a>
                  <img src="/chili-pepper.png" width="20px"></img>
                </p>
                <div className={styles.socials}>
                  <ul>
                    <li>
                      <a href="https://www.linkedin.com/in/ahmed-el-meskyny-b570041b5/">
                        <img src="/linkedin.png"></img>
                      </a>
                    </li>
                    <li>
                      <a href="https://github.com/ahmed-elmeskyny">
                        <img src="github.png"></img>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          </Layout>
        ) : (
          <Loader></Loader>
        )}
      </main>
    </>
  );
}
