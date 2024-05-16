import { Box, Flex, FormControl, FormLabel, Input, Button, Select, VStack, Heading, Text, Spinner, Image } from "@chakra-ui/react";
import { FaUpload } from "react-icons/fa";
import Plot from "react-plotly.js";
import React from 'react';


const Index = () => {
  const [plotData, setPlotData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // set up handle for filtering options in selection box
  const [selectedModel, setSelectedModel] = React.useState('');
  const [displayModeOptions, setDisplayModeOptions] = React.useState([]);

  const modelOptions = {
    human: [
      { value: 'average', label: 'Average across cell types' },
      { value: 'HFF', label: 'HFF' },
      { value: 'H1hESC', label: 'H1hESC' },
      { value: 'GM12878', label: 'GM12878' },
      { value: 'IMR90', label: 'IMR90' },
      { value: 'HCT116', label: 'HCT116' },
    ],
    mouse: [
      { value: 'average', label: 'Average across cell types' },
      { value: 'mESC_uC', label: 'mESC_uC' },
      { value: 'mESC', label: 'mESC' },
      { value: 'CN', label: 'Cortical Neuron' },
      { value: 'ncx_CN', label: 'Neocortex Cortical Neuron' },
      { value: 'NPC', label: 'Neural Progenitor Cell' },
      { value: 'ncx_NPC', label: 'Neocortex Neural Progenitor Cell' },
    ],
  };

  const handleModelChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedModel(selectedValue);
    setDisplayModeOptions(modelOptions[selectedValue] || []);
  };

  // Function to handle form submission, it should send the data to the backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted");
  
    // Create an instance of FormData
    const formData = new FormData();
  
    // Append the files to formData. Since you allow multiple files, append each one.
    // const files1 = document.getElementById('file-upload').files;
    // for (let i = 0; i < files.length; i++) {
    //   formData.append('files', files[i]);
    // }
    const file1 = document.getElementById('file-upload').files;
    const file2 = document.getElementById('file-upload2').files;
    const allFiles = [...file1, ...file2];
  
    // Append each file to the formData object
    for (let i = 0; i < allFiles.length; i++) {
      formData.append('files', allFiles[i]);
    }
  
    // Append other form data
    formData.append('species', document.getElementById('species-select').value);
    formData.append('displaymode', document.getElementById('display-mode').value);
  
    // Use Fetch API to send the formData to backend
    try {
      setLoading(true);
      const response = await fetch('https://6nzxdwcc-5000.usw2.devtunnels.ms/predict-hic', {
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
    const file = event.target.files[0];
    console.log("File uploaded:", file);
  };

  return (
    <VStack height="100vh" padding={4} alignItems="flex-start">
      <Flex alignItems="flex-end">
        <Image src="/Akita_web/akita_log.jpeg" alt="Akita Logo" boxSize="60px" marginRight={2} />
        <Heading as="h1" size="lg" style={{fontWeight: 'normal'}}>
        Akita
        </Heading>
      </Flex>
      <Box borderBottom="1px" borderColor="gray.200" width="100%"></Box>
      <Flex direction="row" width="100%">
        <VStack width="30%" borderRight="1px" borderColor="gray.200" paddingRight={4} marginTop={7}>
          <FormControl as="form" onSubmit={handleSubmit}>

            <FormLabel htmlFor="species-select">Models</FormLabel>
            <Select id="species-select" placeholder="Select model" mb={4} onChange={handleModelChange}>
              <option value="human">Human (Input Length=1310720; Output image size=512*512 bins; Bin Size=2048)</option>
              <option value="mouse">Mouse (Input Length=1310720; Output image size=512*512 bins; Bin Size=2048)</option>
            </Select>

            <FormLabel htmlFor="display-mode">Display Modes</FormLabel>
            <Select id="display-mode" placeholder="Select mode" mb={4}>
            {displayModeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </Select>

            <FormLabel htmlFor="file-upload">Upload DNA Sequence File1</FormLabel>
            <Input type="file" id="file-upload" accept=".txt" onChange={handleFileUpload} single mb={4} />

            <FormLabel htmlFor="file-upload2">Upload DNA Sequence File2</FormLabel>
            <Input type="file" id="file-upload2" accept=".txt" onChange={handleFileUpload} single mb={4} />

            <Button leftIcon={<FaUpload />} colorScheme="blue" type="submit">
              Submit
            </Button>

          </FormControl>
        </VStack>
        <Box width="70%" paddingLeft={4} marginTop={7}>
          <Heading as="h3" size="md" paddingBottom={4} style={{fontWeight: 'normal'}}> 
            Predicted log(Obs/Exp) Map
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


