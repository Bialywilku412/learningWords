import { useNavigate } from "react-router-dom";

const CardsRow = ({ cards, to }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to)
    }
    return (
        <tr className="table-clickable-row" onClick={handleClick} style={{ cursor: "pointer" }}>
            <th scope="row" className="align-middle text-center">
                {cards.id}
            </th>
            <td className="align-middle">
                {cards.name}
            </td>
        </tr>
    );
}

export default CardsRow;
