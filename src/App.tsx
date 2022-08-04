
import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png';
import {GridItem} from './components/GridItem/GridItem';
import {levels, calculateIMC, Level} from './helpers/imc';


const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weighField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculateButton = () => {
    if(heightField && weighField){
      setToShow(calculateIMC(heightField, weighField));
    }else{
      alert('Por favor, preencha todos os campos');
    }
  }
  const handleBackButton = () => {
    setToShow(null);
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule seu IMC</h1>
          <p>
            IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela 
            Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.
          </p>
          <input 
            type="number" 
            placeholder="Digite a sua altura. Ex: 1.5 (em metros)"
            value={heightField > 0 ? heightField : ''}
            onChange={e => setHeightField(parseFloat(e.target.value))}
            disabled={toShow !== null}
          />
          <input 
            type="number" 
            placeholder="Digite o sue peso. Ex: 75 (em Kg)"
            value={weighField > 0 ? weighField : ''}
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled={toShow !== null}
          />
          <button onClick={handleCalculateButton} disabled={toShow !== null}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item} />
              ))}
            </div>
          }
          {toShow &&
            <div className={styles.rightSideBig}>
              <div className={styles.rightArrow}>
                <img src={leftArrowImage} alt="" width={25} onClick={handleBackButton}/>
              </div>
              <GridItem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default App;