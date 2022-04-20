import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';


export default function Home(): JSX.Element {
  
  const getDataHome = async ({ pageParam = null }) => {
    let res = await api.get("/images" , {
      params: {
        after: pageParam,
      },
    });
    let { data } = res.data;
    return data
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery( 'images', getDataHome, {
      getNextPageParam: lastPage => lastPage.after,
  });
    

  const formattedData = useMemo(() => {
   
    return data ? data?.pages.map(page => page).flat() : [];
  }, [data]);

  

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
          {hasNextPage && (
            <Button bg="yellow.400" onClick={() => fetchNextPage()}>
              {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
            </Button>
          )}
      </Box>
    </>
  );
}
