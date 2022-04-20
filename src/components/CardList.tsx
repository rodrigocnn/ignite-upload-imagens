import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState , useEffect} from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [urlImg, setUrlImg] = useState('');

  useEffect(()=>{
    cards.map((item)=>console.log(item.url))
  },[])


  function handleViewImage(url: string): void {
    setUrlImg(url);
    onOpen();
  }

  return (
    <>
   <SimpleGrid columns={3} spacing={10}>
        {cards.map(data => (
          <Card
            key={data.id}
            viewImage={() => handleViewImage(data.url)}
            data={data}
          />
        ))}
      </SimpleGrid>

      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={urlImg} /> 
    </>
  );
}
