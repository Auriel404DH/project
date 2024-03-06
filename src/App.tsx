import { useState } from 'react';
import styles from './App.module.css';

interface Param {
  id: number;
  name: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}
interface Model {
  paramValues: ParamValue[];
  params: Param[]
}

const params: Param[] = [
  {
    id: 1,
    name: "Назначение"
  },
  {
    id: 2,
    name: "Длинна"
  }
]

const emptyModel = {
  params: params,
  paramValues: params.map(elem => ({ paramId: elem.id, value: '' }))
}

function App() {
  const [model, setModel] = useState<Model>(emptyModel)  

  const onChangeModel = ({ id, value }: { id: number, value: string }) => {
      const currentParam = model.paramValues.find(param => param.paramId === id)
      
      if (!currentParam) return;      

      const newParam = {...currentParam, value}

      const otherModelParams = model.paramValues.filter(param => param.paramId !== id)

      setModel({...model, params, paramValues: [...otherModelParams, newParam]})
  }

  const getModel = () => console.log(model);

  return (
    <div className={styles.wrapper}>
      {params.map((elem)=> {
        return (
          <div className={styles.paramItem}>
            <div key={elem.id}>{elem.name}</div>
            <input onChange={(e) => onChangeModel({id: elem.id, value: e.target.value})} type='text'/>
          </div>
        )
      })}

      <button onClick={getModel}>Показать модель</button>
    </div>
  );
}

export default App;
