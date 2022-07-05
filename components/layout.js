import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme/theme';

export default function Layout({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}