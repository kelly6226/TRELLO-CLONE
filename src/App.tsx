import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { todoState } from "./atoms";
import DraggableCard from "./components/DraggableCard";

const toDos = ["a", "b", "c", "d", "e", "f"];

function App() {
  const [toDos, setToDos] = useRecoilState(todoState);

  // 드래그가 끝났을때 실행되는 함수

  /*
    toDos를 가지고 우리가 진행할 2가지 단계
    1. array로부터 source.index(최근에 움직인 item의 index)를 지우기
    2. destination의 index를 확인해서 해당 index에 우리가 방금 삭제한것을 추가하기
  */
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;

    setToDos((oldToDos) => {
      const copyToDos = [...oldToDos];
      // 1) source.index에서 item 삭제하기
      //source.index에서는 우리에게 array에서 우리가 움직이고 싶은 item이 어디에 有는지 알려줌
      copyToDos.splice(source.index, 1);

      // 2) destination.index로 item을 다시 돌려주기
      copyToDos.splice(destination?.index, 0, toDos[source.index]);
      return copyToDos;
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((toDo, index) => (
                  <DraggableCard key={toDo} index={index} toDo={toDo} />
                ))}
                {magic.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

export default App;
