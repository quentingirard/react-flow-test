import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { create } from "@github/webauthn-json" 

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
} from '@chakra-ui/react';
import { useFormik } from "formik";

import { useNewSessionMutation, useCredentialsMutation, useChallengeMutation } from '../../services/modules/auth'

export default function SignIn() {
  const [newSession, newSessionValues] = useNewSessionMutation()
  const [credentials, credentialsValues] = useCredentialsMutation()
  const [challenge, challengeValues] = useChallengeMutation()
  const [ask2FA, setAsk2FA] = useState(false)

console.log("challengeValues", challengeValues)

  useEffect(() => {
    if (newSessionValues.isSuccess) {
      setAsk2FA(true)
    }
  }, [newSessionValues.isSuccess])

  const formik = useFormik({
    initialValues: {
      email: "dev@wavemind.ch",
      password: "123456",
    },
    onSubmit: newSession
  });

  useEffect(() => {
    if (challengeValues.isSuccess) {
      create({ 'publicKey': {...challengeValues.data, rp: {name: 'Test'}} })
      .then((newCredentialInfo) => {
        console.log('SUCCESS', newCredentialInfo)
        credentials({credential: newCredentialInfo, challenge: challengeValues.data.challenge})
      })
      .catch((error) => {
          console.log('FAIL', error)
      })
    }
  }, [challengeValues.isSuccess])

  if (ask2FA) {
    return (
      <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgGradient='linear(to-b, blue.100, blue.700)'>
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">2FA</Heading>
        </Stack>

        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          minW="lg"
          p={8}>
          <Stack spacing={4}>
            <Stack align="center">
              <Text fontSize="m" color='red'>Les erreurs</Text>
            </Stack>
            <Stack spacing={10} mt={8}>
              <Button
                type="submit"
                bg="blue.400"
                color="white"
                onClick={challenge}
                _hover={{
                  bg: 'blue.500',
                }}>
                Verify
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    )
  }

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgGradient='linear(to-b, blue.100, blue.700)'>
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Login</Heading>
        </Stack>

        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          minW='lg'
          p={8}>
          <Stack spacing={4}>
            <Stack align="center">
              <Text fontSize="m" color='red'>{newSessionValues.isError && newSessionValues.error.data.errors.join()}</Text>
            </Stack>
            <form onSubmit={formik.handleSubmit}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </FormControl>
              <Stack spacing={10} mt={8}>
                <Button
                  type="submit"
                  bg="blue.400"
                  color="white"
                  isLoading={newSessionValues.isLoading}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button>
              </Stack>
            </form>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align="start"
              justify="space-between">
              <Link color="blue.400">Forgot password?</Link>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
