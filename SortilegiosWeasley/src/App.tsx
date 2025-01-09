import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Product from '../components/Product.tsx'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div className="container">
                <Product img={'../src/assets/imgProducts/polvo_peruano_oscuridad_instantanea.png'}
                         title={'Polvo Peruano de Oscuridad Instantánea'}
                         price={500}
                         description={'Polvo que al ser lanzado en el aire, oscurece la zona en la que se encuentra. Ideal para escapar de situaciones incómodas.'}
                />

                <Product img={'../src/assets/imgProducts/pociones_de_amor.png'}
                         title={'Pociones de Amor'}
                         price={300}
                         description={'Pociones que al ser ingeridas, hacen que la persona que la consuma se enamore de la primera persona que vea.'}
                />
            </div>
        </>
    )
}

export default App
