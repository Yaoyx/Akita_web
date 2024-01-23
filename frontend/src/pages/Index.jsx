import { Box, Flex, FormControl, FormLabel, Input, Button, Select, VStack, Heading, Text } from "@chakra-ui/react";
import { FaUpload } from "react-icons/fa";

const Index = () => {
  // Function to handle file upload, it should send the file to the backend
  const handleFileUpload = (event) => {
    // TODO: Implement file upload logic
    const file = event.target.files[0];
    console.log("File uploaded:", file);
    // You would typically send the file to your Flask backend here
  };

  // Function to handle form submission, it should send the data to the backend
  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Implement form submission logic
    console.log("Form submitted");
    // You would typically send the form data to your Flask backend here
  };

  return (
    <VStack height="100vh" padding={4} alignItems="flex-start">
      <Heading as="h1" size="xl" paddingBottom={2}>
        Akita
      </Heading>
      <Box borderBottom="1px" borderColor="gray.200" width="100%" paddingBottom={4}></Box>
      <Flex direction="row" width="100%">
        <VStack width="30%" borderRight="1px" borderColor="gray.200" paddingRight={4}>
          <Heading as="h3" size="lg" paddingBottom={2}>
            DNA Sequence Input
          </Heading>
          <FormControl as="form" onSubmit={handleSubmit}>
            <FormLabel htmlFor="file-upload">Upload DNA Sequence File</FormLabel>
            <Input type="file" id="file-upload" accept=".txt" onChange={handleFileUpload} mb={4} />
            <FormLabel htmlFor="species-select">Select Species</FormLabel>
            <Select id="species-select" placeholder="Select species" mb={4}>
              {/* Add species options here */}
              <option value="human">Human</option>
              <option value="mouse">Mouse</option>
              {/* ... other species */}
            </Select>
            <FormLabel htmlFor="sequence-length">Sequence Length</FormLabel>
            <Input id="sequence-length" placeholder="Enter sequence length" mb={4} />
            <FormLabel htmlFor="bin-size">Bin Size</FormLabel>
            <Select id="bin-size" placeholder="Select bin size" mb={4}>
              {/* Add bin size options here */}
              <option value="100kb">100kb</option>
              <option value="1mb">1Mb</option>
              {/* ... other bin sizes */}
            </Select>
            <Button leftIcon={<FaUpload />} colorScheme="blue" type="submit">
              Submit
            </Button>
          </FormControl>
        </VStack>
        <Box width="70%" paddingLeft={4}>
          <Heading as="h3" size="lg" paddingBottom={4}>
            Hi-C Map Plot
          </Heading>
          <Text>
            {/* This is where you would display the plotly plot.
                  Since we can't actually integrate with Plotly here,
                  let's just assume the plot would go here. */}
            <Box border="1px" borderColor="gray.200" borderRadius="md" p={4} minHeight="200px">
              (Hi-C Map Plot will be displayed here)
            </Box>
          </Text>
        </Box>
      </Flex>
    </VStack>
  );
};

export default Index;
