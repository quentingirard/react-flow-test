import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as WebAuthnJSON from "@github/webauthn-json";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  Text,
  useColorMode
} from "@chakra-ui/react";
import { useFormik } from "formik";

import {
  useNewSessionMutation,
  useChallengeMutation,
  useAuthenticateMutation,
} from "../../services/modules/auth";

export default function SignIn() {
  const router = useRouter();
  const { toggleColorMode } = useColorMode()

  const [newSession, newSessionValues] = useNewSessionMutation();
  const [challenge, challengeValues] = useChallengeMutation();
  const [authenticate, authenticateValues] = useAuthenticateMutation();

  const formik = useFormik({
    initialValues: {
      email: "dev@wavemind.ch",
      password: "123456",
    },
    onSubmit: newSession,
  });

  const titleColor = useColorModeValue("teal.300", "teal.200");

  useEffect(() => {
    if (newSessionValues.isSuccess) {
      if (newSessionValues.data.challenge) {
        WebAuthnJSON.get({
          publicKey: { ...newSessionValues.data, rp: { name: "Test" } },
        }).then(newCredentialInfo => {
          authenticate({
            credentials: newCredentialInfo,
            email: formik.values.email,
          });
        });
      } else {
        router.push("/profile");
      }
    }
  }, [newSessionValues.isSuccess]);

  useEffect(() => {
    if (authenticateValues.isSuccess) {
      router.push("/profile");
    }
  }, [authenticateValues.isSuccess]);

  return (
    <Flex position="relative">
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "100vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        pt={{ sm: "100px", md: "0px" }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="48px"
            mt={{ md: "150px", lg: "80px" }}
          >
            <Heading color={titleColor} mb={10}>
              Login
            </Heading>
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Email
                </FormLabel>
                <Input
                  borderRadius="15px"
                  mb="24px"
                  fontSize="sm"
                  type="text"
                  placeholder="Your email adress"
                  size="lg"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Password
                </FormLabel>
                <Input
                  borderRadius="15px"
                  mb="36px"
                  fontSize="sm"
                  type="password"
                  placeholder="Your password"
                  size="lg"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <Stack align="center">
                  <Text fontSize="m" color="red">
                    {newSessionValues.isError &&
                      newSessionValues.error.data.errors.join()}
                  </Text>
                </Stack>
                <Button
                  type="submit"
                  bg="teal.300"
                  w="100%"
                  h="45"
                  mb="20px"
                  color="white"
                  mt="20px"
                  isLoading={newSessionValues.isLoading}
                  _hover={{
                    bg: "teal.200",
                  }}
                  _active={{
                    bg: "teal.400",
                  }}
                >
                  SIGN IN
                </Button>
              </FormControl>
            </form>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
              <Link color={titleColor} as="span" ms="5px" fontWeight="medium">
                Forgot your password ?
              </Link>
              <Button size='sm' colorScheme='blue' onClick={toggleColorMode}>
        Toggle Mode
      </Button>
            </Flex>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX="hidden"
          h="100%"
          w="40vw"
          position="absolute"
          pt={4}
          pb={4}
          right="0px"
        >
          <Box
            bgImage="/signInImage.png"
            w="100%"
            h="96%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius="20px"
            borderTopLeftRadius="20px"
          />
        </Box>
      </Flex>
    </Flex>
  );
}
