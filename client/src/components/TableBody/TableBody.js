
import React from "react";
import "./TableBody.css";

const TableBody = (props) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th colSpan="5">
                    <img
                        className="bookCover"
                        src={props.cover}
                        alt=""
                    />
                    {props.title}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        {props.author}
                    </td>
                    <td>
                        {props.published}
                    </td>
                    <td>
                        {props.kindle}
                    </td>
                    <td>
                        {props.series} {props.number}
                    </td>
                    <td>
                        [ ]
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default TableBody;

