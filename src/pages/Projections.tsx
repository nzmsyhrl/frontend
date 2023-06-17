import React, { useState } from "react";
import {
  Card,
  Grid,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  BadgeDelta,
  Flex,
  Metric,
  MultiSelect,
  MultiSelectItem,
  Select,
  SelectItem,
  TextInput,
} from "@tremor/react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { cashflowData, configData } from "../data/DumyData";
import ConfigTab from "../components/ConfigTab";

type Props = {};

const Projections = (props: Props) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedName, setSelectedName] = useState<string>("");
  return (
    <main className="flex flex-1 items-start justify-center max-w-full">
      <div className="flex-1 px-12 py-12">
        <Title>Demo</Title>
        <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>

        <TabGroup className="mt-6">
          <TabList>
            <Tab>Demo</Tab>
            <Tab>Playground</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
                <Card>
                  {/* Placeholder to set height */}
                  <div className="h-28" />
                </Card>
                <Card>
                  {/* Placeholder to set height */}
                  <div className="h-28" />
                </Card>
                <Card>
                  {/* Placeholder to set height */}
                  <div className="h-28" />
                </Card>
              </Grid>
              <div className="mt-6">
                <Card>
                  <div className="h-80" />
                </Card>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="mt-6 flex">
                <Grid numItemsMd={2} numItemsLg={2} className="gap-6 flex-1">
                  {cashflowData.map((item) => (
                    <Card key={item.title}>
                      <Flex alignItems="start">
                        <div className="truncate ">
                          <Text>{item.title}</Text>
                          <Metric className="truncate">{item.metric}</Metric>
                        </div>
                        <BadgeDelta deltaType={item.deltaType}>
                          {item.delta}
                        </BadgeDelta>
                      </Flex>
                      <Flex className="mt-4 space-x-2">
                        <Text className="truncate">{`${item.progress}% (${item.metric})`}</Text>
                        <Text>{item.target}</Text>
                      </Flex>
                      {/* <ProgressBar value={item.progress} className="mt-2" /> */}
                    </Card>
                  ))}
                </Grid>
                <Grid className="flex-1">
                  <Flex alignItems="center" flexDirection="col" >
                    <ConfigTab />
                  </Flex>
                </Grid>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </main>
  );
};

export default Projections;
