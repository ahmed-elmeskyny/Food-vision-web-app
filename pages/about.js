//next
import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/About.module.scss";
import Layout from "@/components/layout/layout";

export default function About() {
  return (
    <>
      <Head>
        <title>Food Vision</title>
        <meta name="description" content="101 foor categories classifier" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/see.png" />
      </Head>
      <main className={styles.main}>
        <Layout>
          <div className={styles.textContainer}>
            <div>
              <h1>Data Set :</h1>
              <p>fff</p>
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
}
