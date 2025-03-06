import { useContext } from "react";
import { ProductContext } from "./ProductCard";

/*    En este primer componente hay que preguntarnos que es lo que requrimos pasar por argumento, aqui:
        Desestructuramos la imagen y la igualamos a comillas para que sea opcional el valor y no crearnos una interfaces para eso
        (Esta IMG hace que no requieramos llamarla desde Product que es donde la teniamos antes)
*/
import styles from '../styles/styles.module.css';
import noImage from '../assets/no-image.jpg';

export const ProductImage = ({ img = '' }) => {

    // Con la parte de la imagen tenemos 3 posibilidades, una es que puede venir por la definicion de la propiedad
    // o puede que venga en el "product" o que no venga en nigun lado y tengamos que poner NoImage
    const { product } = useContext( ProductContext );

    // Luego tenemos que evaluarlo
    // Ya es segun nuestros requerimiento pero en este caso si nos mandan la imagen mediante la property siginifica que esa es la que el usuario quiere poner
    // Recordemos que todos los objetos son pasados por referencia para no sobreescribir la imagen anterior
    let imgToShow: string;

    if( img ){ // Si viene la imagen
        imgToShow = img;
    } else if( product.img ) {
        imgToShow = product.img;
    }else{
        imgToShow = noImage;
    }

    return (
        // Preguntamos si en el Product viene el IMG entonces que use la imagen caso contrario use la otra que no contiene nada
        // Un String vacio para un ternario es concidetado que no tiene valor 
        <img className={ styles.productImg } src={ imgToShow } alt="Product" />
    );
}