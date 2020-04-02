import React from 'react'

import {
  CloudUploadOutlined,
  FileTextOutlined,
  FileWordOutlined,
  MessageOutlined,
  SearchOutlined,
  SnippetsOutlined,
} from '@ant-design/icons';

import { Tag, Button } from 'antd';
import { useStaticQuery, graphql, navigate } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import Layout from '../components/layout'

const Banner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  justify-content: center;
  align-items: center;
  grid-gap: 1rem;
  min-height: 40vh;
  max-width: 50rem;
  margin: 1rem;
  h1 {
    font-size: 3rem;
    margin-bottom: 0;
  }
`

export default function About () {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "images/wordcloudBlue.png" }) {
        childImageSharp {
          # Specify a fluid image and fragment
          # The default maxWidth is 800 pixels
          fluid(fit: CONTAIN) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <div style={{ gridArea: 'main' }}>
        <div
          style={{
            minHeight: '80vh',
            // background: '#001529',
            display: 'grid'

          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              alignContent: 'center',
              alignItems: 'center',
              padding: '1rem',
              justifySelf: 'center',
              maxWidth: '80rem'
            }}
          >
            <div>
              <h1 style={{ fontSize: '3rem' }}>
              Transcribe all the things...
              </h1>
              <Button type='primary' onClick={() => navigate('/signup')}>
              Sign Up - It's Free
              </Button>
            </div>
            <div>
              <Img
                style={{
                  width: '100%',
                  // maxWidth: "40rem",
                  height: 'auto'
                }}
                fluid={data.file.childImageSharp.fluid}
                alt='Transcribr Logo'
              />
            </div>
          </div>
        </div>

        <div
          style={{
            gridColumn: '1/-1',
            gridRow: '2',
            display: 'grid',
            alignSelf: 'center',
            justifyContent: 'center',
            justifyItems: 'center',
            justifySelf: 'center',
            width: '100%',
            gridGap: '4rem'
          }}
        >
          <Banner>
            <CloudUploadOutlined style={{ fontSize: '10rem', color: '#1890FF' }} />
            <div style={{ width: '100%' }}>
              <h1>Upload</h1>
              <p>Instantly upload almost any kind of audio or video file.</p>
              <p>
                <Tag color='blue'>AAC</Tag>
                <Tag color='blue'>AC3</Tag>
                <Tag color='blue'>AIF</Tag>
                <Tag color='blue'>AIFC</Tag>
                <Tag color='blue'>AIFF</Tag>
                <Tag color='blue'>AMR</Tag>
                <Tag color='blue'>AU</Tag>
                <Tag color='blue'>CAF</Tag>
                <Tag color='blue'>FLAC</Tag>
                <Tag color='blue'>M4A</Tag>
                <Tag color='blue'>M4B</Tag>
                <Tag color='blue'>MP3</Tag>
                <Tag color='blue'>OGA</Tag>
                <Tag color='blue'>SFARK</Tag>
                <Tag color='blue'>VOC</Tag>
                <Tag color='blue'>WAV</Tag>
                <Tag color='blue'>WEBA</Tag>
                <Tag color='blue'>WMA</Tag>

                {/* VIDEO */}

                <Tag color='orange'>3G2</Tag>
                <Tag color='orange'>3GP</Tag>
                <Tag color='orange'>3GPP</Tag>
                <Tag color='orange'>AVI</Tag>
                <Tag color='orange'>CAVS</Tag>
                <Tag color='orange'>DV</Tag>
                <Tag color='orange'>DVR</Tag>
                <Tag color='orange'>FLV</Tag>
                <Tag color='orange'>M2TS</Tag>
                <Tag color='orange'>M4V</Tag>
                <Tag color='orange'>MKV</Tag>
                <Tag color='orange'>MOD</Tag>
                <Tag color='orange'>MOV</Tag>
                <Tag color='orange'>MP4</Tag>
                <Tag color='orange'>MPEG</Tag>
                <Tag color='orange'>MPG</Tag>
                <Tag color='orange'>MTS</Tag>
                <Tag color='orange'>MXF</Tag>
                <Tag color='orange'>OGG</Tag>
                <Tag color='orange'>RM</Tag>
                <Tag color='orange'>RMVB</Tag>
                <Tag color='orange'>SWF</Tag>
                <Tag color='orange'>TS</Tag>
                <Tag color='orange'>VOB</Tag>
                <Tag color='orange'>WEBM</Tag>
                <Tag color='orange'>MWV</Tag>
                <Tag color='orange'>WTV</Tag>
              </p>
            </div>
          </Banner>

          <Banner>
            <div style={{ width: '100%' }}>
              <h1>Transcribe</h1>
              <p>
              Create a transcript from your video or audio file. Edit it here or
              export it as a .txt or .word file.
              </p>
              <p>
                <Tag color='blue'>
                  <FileTextOutlined /> .txt
                </Tag>

                <Tag color='blue'>
                  <FileWordOutlined /> .docx
                </Tag>
              </p>
            </div>
            <MessageOutlined style={{ fontSize: '8rem', color: 'orange' }} />
          </Banner>

          <Banner>
            <SearchOutlined style={{ fontSize: '8rem', color: '#1890FF' }} />
            <div style={{ width: '100%' }}>
              <h1>Search</h1>
              <p>
              Review a 3 hour long podcast in less than 5 minutes. Find
              relevant keywords and find them instantly in the transcript.
              </p>
            </div>
          </Banner>

          <Banner>
            <div style={{ width: '100%' }}>
              <h1>Cite</h1>
              <p>Create citations with your desired format</p>
              <p>
                <Tag color='blue'>APA</Tag>
                <Tag color='blue'>MLA</Tag>
                <Tag color='blue'>Chicago</Tag>
                <Tag color='blue'>Vancouver</Tag>
                <Tag color='blue'>Harvard</Tag>
              </p>
            </div>
            <SnippetsOutlined style={{ fontSize: '8rem', color: 'orange' }} />
          </Banner>
        </div>
      </div>
    </Layout>
  );
}
