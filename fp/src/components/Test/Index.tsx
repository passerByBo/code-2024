// function Home() {
//   return <h1 className="text-red-600">Hello CSS 这个</h1>;
// }
// export default Home;

// import { useImmer } from '@hooks/useImmer';
import Button from '@mui/material/Button';
import { countAtom, mangaAtomObj } from '@states/index';
// import { useAtom } from 'jotai';
import { useImmerAtom } from 'jotai-immer';
import { useEffect } from 'react';

export default function ButtonUsage() {
  const [count, setCount] = useImmerAtom(mangaAtomObj);
  console.log('函数执行---outer');
  //复杂的一些初始化组件的逻辑 计算...
  // const [data, setData] = useState({
  //   field1: 'value1',
  //   field2: 'value2',
  //   largeData: new Array(1000).fill('data'),
  // });
  // const [data, setData] = useImmer({
  //   field1: 'value1',
  //   field2: 'value2',
  //   largeData: new Array(1000).fill('data'),
  // });
  //必须丢在这里面
  useEffect(() => {
    console.log('函数执行 inner');
  }, []);
  // const [num, setNum] = useAtom(countAtom);

  const handleClick = () => {
    // setData({ ...data, field1: 'newValue' });
    // setData(draft => {
    //   draft.field1 = 'newValue';
    // });
    // setNum(Math.random());
    setCount(draft => {
      draft.a = draft.a + 1;
    });
  };
  return (
    <Button variant="contained" onClick={handleClick}>
      Hello world {count.a}
    </Button>
  );
}
ButtonUsage.whyDidYouRender = true;
