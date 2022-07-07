import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as WebAuthnJSON from "@github/webauthn-json";
import NextLink from "next/link";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  VStack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useFormik } from "formik";

import { useNewPasswordMutation } from "../../services/modules/auth";

export default function SignIn() {
  const router = useRouter();
  const { toggleColorMode } = useColorMode();

  const [newPassword, newPasswordValues] = useNewPasswordMutation();

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => newPassword({ values, query: router.query }),
  });

  const titleColor = useColorModeValue("teal.300", "teal.200");

  useEffect(() => {
    if (newPasswordValues.isSuccess) {
      router.push("/auth/signin");
    }
  }, [newPasswordValues.isSuccess]);

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
            <Heading as="h1" mb={10}>
              New Password
            </Heading>
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <VStack align="left" spacing={5}>
                  <Box>
                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                      Password
                    </FormLabel>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Your new password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      fontSize="sm"
                      size="lg"
                    />
                  </Box>
                  <Box>
                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                      Confirm password
                    </FormLabel>
                    <Input
                      type="password"
                      name="passwordConfirmation"
                      placeholder="Confirm your password"
                      onChange={formik.handleChange}
                      value={formik.values.passwordConfirmation}
                      fontSize="sm"
                      size="lg"
                    />
                  </Box>
                </VStack>
                <Box mt={4} textAlign="center"></Box>
                <Button
                  type="submit"
                  bg="teal.300"
                  w="100%"
                  h="45"
                  mb="20px"
                  color="white"
                  mt="20px"
                  isLoading={newPasswordValues.isLoading}
                  _hover={{
                    bg: "teal.200",
                  }}
                  _active={{
                    bg: "teal.400",
                  }}
                >
                  CHANGE
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
              <NextLink href="/auth/signin">
                <Link color={titleColor} as="span" ms="5px" fontWeight="medium">
                  Sign in
                </Link>
              </NextLink>
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
