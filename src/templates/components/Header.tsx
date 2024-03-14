import {
  Body,
  Container,
  Column,
  Head,
  Html,
  Img,
  Link,
  Button,
  Preview,
  Row,
  Section,
  Text,
  render,
} from "@react-email/components";

const content = {
  padding: "5px 20px 10px 20px",
};

const logo = {
  display: "flex",
  justifyContent: "center",
  alingItems: "center",
  padding: 30,
  margin:'0 auto'
};

const sectionsBorders = {
  width: "100%",
  display: "flex",
};

const sectionBorder = {
  borderBottom: "1px solid rgb(238,238,238)",
  width: "249px",
};

const sectionCenter = {
  borderBottom: "1px solid rgb(145,71,255)",
  width: "102px",
};

export default function Header() {
  return (
    <>
      <Section style={logo}>
        <h1>SOMO STORE</h1>
      </Section>
      <Section style={sectionsBorders}>
        <Row>
          <Column style={sectionBorder} />
          <Column style={sectionCenter} />
          <Column style={sectionBorder} />
        </Row>
      </Section>
    </>
  );
}
