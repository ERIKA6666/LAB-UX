import { Navbar } from "@/components/ui/navbar";
import { Carousel, Divider, Card, Flex, Typography, Button,} from "antd";
import type { CSSProperties } from "react";

const contentStyle: CSSProperties = {
  height: "auto",
  color: "#fff",
  lineHeight: "400px",
  textAlign: "center",
  background: "#364d79",
  padding: "40px 0",
  fontSize: "24px",
};

const imgStyle: CSSProperties = {
  display: "block",
  width: 500,
  height: "auto",
  objectFit: "cover",
};

const { Meta } = Card;

const cardData = [
  {
    title: "Card 1",
    image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
  {
    title: "Card 2",
    image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
  {
    title: "Card 3",
    image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
  {
    title: "Card 4",
    image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
  {
    title: "Card 5",
    image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
  {
    title: "Card 6",
    image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
];

const cardStyle: CSSProperties = {
  maxWidth: 300,
  minWidth: 200,
  marginRight: 16,
  flexShrink: 0,
};
export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="w-full">
        <Carousel autoplay autoplaySpeed={3000} arrows infinite>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
      </div>

      <div className="container mx-auto mt-8 px-4">
        <Divider style={{ borderColor: "#7cb305" }}>Misión</Divider>
        <p>
          Promover la innovación en experiencia de usuario mediante investigación, formación y
          soluciones centradas en las personas.
        </p>
        <div className="overflow-x-auto px-4 py-6" style={{ scrollSnapType: "x mandatory", display: "flex", gap: 16 }}>
            {cardData.map((card, index) => (
              <Card
                key={index}
                hoverable
                cover={
                  <img
                    alt={card.title}
                    src={card.image}
                    style={{ height: 400, objectFit: "cover" }}
                  />
                }
                style={{ ...cardStyle, scrollSnapAlign: "start" }}
              >
                
              </Card>
            ))}
          </div>
      </div>

      <div className="container mx-auto mt-8 px-4">
        
          <Flex
            justify="space-between"
            wrap="wrap"
            style={{ gap: 16, alignItems: "center" }}
          >
            <Flex
              vertical
              align="flex-start"
              justify="space-between"
              style={{ padding: 32, flex: 1, minWidth: 250 }}
            >
              <h3>Visión</h3>
              <p>
                Ser un referente en UX, reconocido por nuestra excelencia en investigación,
                formación de profesionales y desarrollo de soluciones que transformen la interacción entre personas y tecnología.
              </p>
              <Button type="primary" href="https://ant.design" target="_blank">
                Get Started
              </Button>
            </Flex>
            <img
              alt="avatar"
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              style={imgStyle}
            />
          </Flex>
        
      </div>

      <div className="container mx-auto mt-8 px-4">
        <Divider style={{ borderColor: "#7cb305" }}>Valores</Divider>
        <p>
          los valores son una parte importante de la usabilidad
        </p>
        <div className="overflow-x-auto px-4 py-6" style={{ scrollSnapType: "x mandatory", display: "flex", gap: 16 }}>
            {cardData.map((card, index) => (
              <Card
                key={index}
                hoverable
                cover={
                  <img
                    alt={card.title}
                    src={card.image}
                    style={{ height: 400, objectFit: "cover" }}
                  />
                }
                style={{ ...cardStyle, scrollSnapAlign: "start" }}
              >
                
              </Card>
            ))}
          </div>
      </div>

    </main>
  );
}
