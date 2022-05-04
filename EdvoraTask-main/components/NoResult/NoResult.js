import styles from './NoResult.module.css';


export const NoResult = () => {

    const { no_results } = styles;

    return (
        <div className = { no_results } >No Result</div>
    );
};