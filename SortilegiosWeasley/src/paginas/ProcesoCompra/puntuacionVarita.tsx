import '../../styles/puntuacionVarita.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'

const DEFAULT_COUNT = 5;
const DEFAULT_UNSELECTED_COLOR = 'grey';
const DEFAULT_SELECTED_COLOR = 'gold';

interface PuntuacionVaritaProps {
    defaultRaing: number | 0;
    iconSize: string | null;
    modifiable: boolean;
}

export default function PuntuacionVarita({defaultRaing, iconSize, modifiable} : PuntuacionVaritaProps) {
    const [rating, setRating] = useState(defaultRaing);
    const [hoverRating, setHoverRating] = useState(0);

    let varitas = Array(DEFAULT_COUNT).fill(0);

    const handleClick = (rating: number) => {
        setRating(rating);
    }

    if (modifiable === false) {
        return (
            <section className = 'puntuacion-varita-fija'>
                
                {varitas.map((_, index) =>{
                    const isActiveColor = 
                     rating && index < rating;
    
                    let elementColor = "";

                    isActiveColor ? elementColor = 
                    DEFAULT_SELECTED_COLOR : elementColor = DEFAULT_UNSELECTED_COLOR;
    
                    return (
                        <div className="varita-fija" key = {index} 
                        style ={{
                            fontSize: iconSize ? iconSize: '1rem', 
                            color: elementColor}}
                        >
                            <FontAwesomeIcon icon={fas.faWandSparkles} />
                        </div>
                    )
                })}
            </section>
        )
    }

    return (
        <section className = 'puntuacion-varita'>
            
            {varitas.map((_, index) =>{
                const isActiveColor = 
                (rating || hoverRating) && 
                (index < rating || index < hoverRating);

                let elementColor = "";

                isActiveColor ? elementColor = 
                DEFAULT_SELECTED_COLOR : elementColor = DEFAULT_UNSELECTED_COLOR;

                return (
                    <div className="varita" key = {index} 
                    style ={{
                        fontSize: iconSize ? iconSize: '3em', 
                        color: elementColor}}

                        onMouseEnter = {() => setHoverRating(index + 1)}
                        onMouseLeave = {() => setHoverRating(0)}
                        onClick = {() => handleClick(index + 1)}

                    >
                        <FontAwesomeIcon icon={fas.faWandSparkles} />
                    </div>
                )
            })}
        </section>
    )
}