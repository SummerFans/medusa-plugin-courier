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
import Header from "../components/Header";

const ResetPasswordTemplate = ({
  data: { first_name, last_name, store_url, email, token },
}: any) => {

  return (
    <Html>
      <Head />
      <Preview>You updated the password for your Twitch account</Preview>
      <Body style={main}>
        <Container style={container}>
          <Header />

          <Section style={content}>
            <Text style={paragraph}>
              Hi {first_name} {last_name},
            </Text>
            <Text style={paragraph}>
              You updated the password for your Twitch account on . If this was
              you, then no further action is required.
            </Text>
            <Text style={paragraph}>
              <Button
                style={button}
                href={`${store_url}/account/?email=${email}&code=${token}`}
              >
                Reset password
              </Button>
            </Text>
            <Text style={paragraph}>
              Remember to use a password that is both strong and unique to your
              Twitch account. To learn more about how to create a strong and
              unique password,{" "}
              <Link href="#" style={link}>
                click here.
              </Link>
            </Text>
            <Text style={paragraph}>
              Still have questions? Please contact{" "}
              <Link href="#" style={link}>
                Twitch Support
              </Link>
            </Text>
            <Text style={paragraph}>
              Thanks,
              <br />
              Twitch Support Team
            </Text>
          </Section>
        </Container>

        <Section style={footer}>
          <Row>
            <Column align="right" style={{ width: "50%", paddingRight: "8px" }}>
              <Img src={`${store_url}/static/twitch-icon-twitter.png`} />
            </Column>
            <Column align="left" style={{ width: "50%", paddingLeft: "8px" }}>
              <Img src={`${store_url}/static/twitch-icon-facebook.png`} />
            </Column>
          </Row>
          <Row>
            <Text style={{ textAlign: "center", color: "#706a7b" }}>
              © 2022 Twitch, All Rights Reserved <br />
              350 Bush Street, 2nd Floor, San Francisco, CA, 94104 - USA
            </Text>
          </Row>
        </Section>
      </Body>
    </Html>
  );
};

const fontFamily = "HelveticaNeue,Helvetica,Arial,sans-serif";

const main = {
  backgroundColor: "#efeef1",
  fontFamily,
  paddingTop: "32px",
};

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
};

const container = {
  maxWidth: "580px",
  margin: "30px auto",
  backgroundColor: "#ffffff",
};

const footer = {
  maxWidth: "580px",
  margin: "0 auto",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};
const content = {
  padding: "5px 20px 10px 20px",
};

const link = {
  textDecoration: "underline",
};

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

export default function resetPasswordTemplate(data) {
  console.log(data);

  return render(<ResetPasswordTemplate data={data} />, {
    pretty: true,
  });
}
