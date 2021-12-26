import { React, useState } from "react";
import {
  Heading,
  Box,
  Stack,
  Spinner,
  Center,
  Image,
  Text,
  Link,
} from "@chakra-ui/react";
import Dashboard from "./dashboard-story";
import Uploader from "./upload";
import axios from "axios";
import img from "../static/bg2.png";
import logo from "../static/logo2.png";
const Base = () => {
  const [showRes, setShowRes] = useState(false);
  const [data, setData] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const [isDemo, setIsDemo] = useState(false);

  // axios.get("https://wa-chat-analyzer.herokuapp.com/"); //to wake up heroku dyno
  return showRes ? (
    <Dashboard drawData={data} isDemo={isDemo} />
  ) : (
    <Box
      p="1.5rem"
      w="100%"
      h="100%"
      bgImage={img}
      backgroundPosition="top"
      backgroundRepeat="repeat"
      backgroundSize="100%"
    >
      {
        (navigator.serviceWorker.onmessage = (event) => {
          var imageBlob = event.data.file;
          const data = new FormData();
          data.append("file", imageBlob);
          setShowLoader(true);
          axios
            .post("https://wa-chat-analyzer.herokuapp.com/wrap", data, {
              // receive two parameter endpoint url ,form data
            })
            .then((res) => {
              console.log("res data", res.data);
              setData(res.data);
              setShowRes(true);
            });
        })
      }
      <Stack
        align="center"
        direction={["column", "row"]}
        paddingBottom="0.5rem"
        spacing="10px"
      >
        <Image
          boxSize="70px"
          src={logo}
          alt="OurChatStory"
          style={{ imageRendering: "crisp-edges" }}
        />
        <Heading
          mb="2rem"
          colorScheme="blue"
          align="center"
          fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
        >
          #WhatsAppWrapped
        </Heading>
      </Stack>

      <Box m={["0.2rem", "1rem"]} boxShadow="2xl" bg="white" p="5" rounded="md">
        {showLoader ? (
          <Box h="80vh">
            <Center mt="2rem">
              <Text>
                {" "}
                Brewing your story...
                <br />
                Usually takes less than 20 seconds.
                <br />
              </Text>
              <Spinner size="xl" />
            </Center>
          </Box>
        ) : (
          <Uploader
            setIsDemo={setIsDemo}
            setShowRes={setShowRes}
            setData={setData}
          />
        )}
      </Box>
      <Box p="1rem">
        <Text fontSize={["x1", "2xl"]} align="center">
          Made with ❤️ by
        </Text>
        <Text fontSize={["x1", "2xl"]} align="center">
          <Link
            cursor="pointer"
            href="https://twitter.com/anshulagx"
            target="_blank"
          >
            @anshulagx
          </Link>{" "}
          &{" "}
          <Link href="https://twitter.com/iamyajat" target="_blank">
            @iamyajat
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Base;
