import React, { FC } from 'react';
import './App.css';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import CharacterList, { Character } from './CharacterList';
import HooksCounter from './HooksCounter';

const App: FC = () => {
  const characters: Character[] = [
    {
      id: 1,
      name: '桜木花道',
      grade: 1,
      height: 189.2,
    },
    {
      id: 2,
      name: '流川 楓',
      grade: 1,
      height: 187,
    },
    {
      id: 3,
      name: '宮城リョータ',
      grade: 2,
      height: 168,
    },
    {
      id: 4,
      name: '三井 寿',
      grade: 3,
    },
    {
      id: 5,
      name: '赤木剛憲',
      grade: 3,
      height: 197,
    },
  ];

  return (
    <Tabs>
      <TabList>
        <Tab>List Rendering</Tab>
        <Tab>useState</Tab>
        <Tab>Three</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <div className="container">
            <header>
              <h1>SLUMDUNCK登場人物</h1>
            </header>
            <CharacterList school="総北高校" characters={characters} />
          </div>
        </TabPanel>
        <HooksCounter />
        <TabPanel />

        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default App;
