
import React from "react";
import "./TableHead.css";

const TableHead = (props) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th colSpan="5">
                        TableHead.js
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        sort by
                        <br />
                        author
                    </td>
                    <td>
                        sort by
                        <br />
                        year
                    </td>
                    <td>
                        sort by
                        <br />
                        eBook year
                    </td>
                    <td>
                        sort by
                        <br />
                        series
                    </td>
                    <td>
                        *
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default TableHead;

