import { Box, Flex, FormControl, FormLabel, Input, Button, Select, VStack, Heading, Text, Spinner, Image } from "@chakra-ui/react";
import { FaUpload } from "react-icons/fa";
import Plot from "react-plotly.js";
import React from 'react';


const Index = () => {
  const [plotData, setPlotData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // Function to handle form submission, it should send the data to the backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted");
  
    // Create an instance of FormData
    const formData = new FormData();
  
    // Append the files to formData. Since you allow multiple files, append each one.
    const files = document.getElementById('file-upload').files;
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
  
    // Append other form data
    formData.append('species', document.getElementById('species-select').value);
    formData.append('sequenceLength', document.getElementById('sequence-length').value);
    formData.append('binSize', document.getElementById('bin-size').value);
  
    // Use Fetch API to send the formData to backend
    try {
      setLoading(true);
      const response = await fetch('http://akitaweb.us-east-2.elasticbeanstalk.com/predict-hic', {
        method: 'POST',
        credentials: 'include',
        body: formData, // No need to set Content-Type header when using FormData
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Handle response from the backend
      const result = await response.json();
      setLoading(false);
      setPlotData(result);
      console.log("Response from the backend:", result);
    } catch (error) {
      setLoading(false);
      console.error("Failed to send form data:", error);
    }
  };

  // Function to handle file upload, it should send the file to the backend
  const handleFileUpload = (event) => {
    // TODO: Implement file upload logic
    const file = event.target.files[0];
    console.log("File uploaded:", file);
    // You would typically send the file to your Flask backend here
  };

  return (
    <VStack height="100vh" padding={4} alignItems="flex-start">
      <Flex alignItems="flex-end">
        <Image src="/akita_log.jpeg" alt="Akita Logo" boxSize="60px" marginRight={2} />
        <Heading as="h1" size="lg">
        Akita
        </Heading>
      </Flex>
      <Box borderBottom="1px" borderColor="gray.200" width="100%"></Box>
      <Flex direction="row" width="100%">
        <VStack width="30%" borderRight="1px" borderColor="gray.200" paddingRight={4} marginTop={7}>
          <Heading as="h3" size="lg" paddingBottom={2}>
            DNA Sequence Input
          </Heading>
          <FormControl as="form" onSubmit={handleSubmit}>
            <FormLabel htmlFor="file-upload">Upload DNA Sequence File</FormLabel>
            <Input type="file" id="file-upload" accept=".txt" onChange={handleFileUpload} multiple mb={4} />
            <FormLabel htmlFor="species-select">Select Species</FormLabel>
            <Select id="species-select" placeholder="Select species" mb={4}>
              {/* Add species options here */}
              <option value="human">Human</option>
              <option value="mouse">Mouse</option>
            </Select>
            <FormLabel htmlFor="sequence-length">Sequence Length</FormLabel>
            <Select id="sequence-length" placeholder="Select sequence length" mb={4}>
              {/* Add sequence length options here */}
              <option value="1048576">1048576 bases</option>
            </Select>
            <FormLabel htmlFor="bin-size">Bin Size</FormLabel>
            <Select id="bin-size" placeholder="Select bin size" mb={4}>
              {/* Add bin size options here */}
              <option value="2048">2048 bases</option>
            </Select>
            <Button leftIcon={<FaUpload />} colorScheme="blue" type="submit">
              Submit
              
            </Button>
          </FormControl>
        </VStack>
        <Box width="70%" paddingLeft={4} marginTop={7}>
          <Heading as="h3" size="lg" paddingBottom={4}> 
            Hi-C Map
          </Heading>
          <Text>
            {/* This is where you would display the plotly plot. */}
            <Box border="1px" borderColor="gray.200" borderRadius="md" p={4} minHeight="400px">
              {loading ? (
              <Spinner size="xl" /> // Show the spinner when loading is true
              ) : (
                plotData && (
                  <Plot
                    data={plotData.data}
                    layout={plotData.layout}
                  />
                ))
              }
            </Box>
          </Text>
        </Box>
      </Flex>
    </VStack>
  );
};

export default Index;


