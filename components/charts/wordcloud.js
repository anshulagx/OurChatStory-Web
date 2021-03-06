import {
  Heading,
  Image,
  VStack,
} from "@chakra-ui/react";

const Card3 = ({ drawData }) => {
  return (
    <VStack
      spacing="1.5rem"
      align="center"
      justify="center"
      p="1rem"
      height="100vh" w="100vw" bg="black">
      <Heading pt="3rem" textAlign="center" color="white">
        Here is your word cloud
      </Heading>
      <Image
        src={"data:image/png;base64, " + drawData.word_cloud_base64}
        alt="Word Cloud"
        pb="4rem"
      />
    </VStack>
  );
};

export default Card3;
