import React, { FC } from 'react';
import { Heading, List, ListItem, Avatar, Text, Flex } from '@chakra-ui/react';

export type Character = {
  id: number;
  name: string;
  grade: number;
  height?: number;
};

type Props = {
  school: string;
  characters: Character[];
};

const CharacterList: FC<Props> = ({ school, characters }) => (
  <>
    <Heading size="xl" mb="40px">
      {school}
    </Heading>
    <List
      spacing={3}
      bgGradient="linear(to-r, green.200, pink.500)"
      w={[400, 600, 800]}
    >
      {characters &&
        characters.map((item: Character) => (
          <ListItem key={item.id}>
            <Flex>
              <Avatar src="adasd" mx="10px" />
              <div>
                <Heading size="sm">{item.name}</Heading>
                <Text fontSize="sm">{item.grade}年生</Text>
                <Text fontSize="sm">{item.height ?? '???'}cm</Text>
              </div>
            </Flex>
          </ListItem>
        ))}
    </List>
  </>
);

export default CharacterList;
