// Chakra imports
import { 
  Flex,
  Container,
  TableContainer,
  Table,
  TableCaption,
  Tr,
  Tbody,
  Td,
  Heading,
  Button,
  Input,
  FormControl,
  IconButton
} from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons'
import { create } from "@github/webauthn-json" 
import React, { useEffect } from "react";
import { useFormik } from "formik";

import { 
  useLazyGetAllCredentialsQuery,
  useChallengeMutation,
  useCreateCredentialsMutation,
  useDeleteCredentialsMutation
} from "../../services/modules/auth";

export default function Profile() {
  const [getAllCredentials, allCredentialsValues] = useLazyGetAllCredentialsQuery()
  const [createCredentials] = useCreateCredentialsMutation()
  const [deleteCredentials] = useDeleteCredentialsMutation()
  const [challenge, challengeValues] = useChallengeMutation()

  useEffect(() => {
    getAllCredentials()
  }, [])

  useEffect(() => {
    if (challengeValues.isSuccess) {
      create({ 'publicKey': challengeValues.data })
      .then((newCredentialInfo) => {
        createCredentials({ credential: newCredentialInfo, challenge: challengeValues.data.challenge, name: formik.values.name })
        formik.resetForm()
      })
      .catch(error => {
        console.log('FAIL', error)
      })
    }
  }, [challengeValues.isSuccess])

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: challenge
  });

  return (
    <Container maxW='2xl'  mt={4}>
      <Flex direction='column'>
          <Heading color="teal.300">Profile</Heading>
          <TableContainer bg='grey.200' mt={2}>
            <Table variant='simple'>
              <Tbody>
                {allCredentialsValues.data?.map(credential => 
                  <Tr key={credential.id}>
                    <Td>{credential.name}</Td>
                    <Td textAlign="right">
                      <IconButton
                        variant='outline'
                        colorScheme='red'
                        onClick={() => deleteCredentials({ id: credential.id })}
                        aria-label={`Delete ${credential.name}`}
                        icon={<DeleteIcon />}
                      />
                    </Td>
                  </Tr>
                )}
              </Tbody>
              <TableCaption>
                <form onSubmit={formik.handleSubmit}>
                  <FormControl isRequired>
                    <Input
                      required
                      borderRadius='15px'
                      mb='24px'
                      fontSize='sm'
                      type='text'
                      placeholder='Name your auth process'
                      size='lg'
                      name="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                    </FormControl>
                    <Button 
                      type="submit"
                      colorScheme='blue' 
                      isLoading={challengeValues.isLoading}
                      my={2}
                    >
                      Add authentication
                    </Button>
                </form>
              </TableCaption>
            </Table>
          </TableContainer>
      </Flex>
    </Container>
  );
}