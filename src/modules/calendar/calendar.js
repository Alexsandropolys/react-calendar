import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class Calendar extends Component {


    componentDidMount() {
        const date = new Date();
        const dateGreed = this.getCurrDate(date);
        const {dateText, month} = this.getTextDate(date);
        this.setState({
            date: date,
            dateGreed: dateGreed,
            dateText,
            month
        }) 
    }

    state = {
        dateText: 'dateText',
        month: 'month',
        date: new Promise(()=>{new Date()}).then(res => res),
        dateGreed: [
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '']
        ]
    }
    getCurrDate = (d) => {
        
        const date = new Date(d);
        date.setDate(1);
        const lastDayCurrentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); //last day of the current month
        const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate(); //last day of the prev month
        const firstDayIndex = date.getDay() - 1; //index of day of the week
        
        const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay() - 1;
        const greed = [
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '']
        ]
        let j = 0;
        for (let i = firstDayIndex - 1; i >= 0; i--) {
            greed[0][j] = prevLastDay - i;
            j++;
        }
        let count = 1;
        for (let i = firstDayIndex; i < 7; i++) {
            greed[0][i] = count;
            count++;
        }
        let i = 1
        while (count <= lastDayCurrentMonth) {
            for (let j = 0; j < 7; j++) {
                greed[i][j] = count;
                if (count === lastDayCurrentMonth) {
                    count = 700;
                    break;
                }
                count++;
            }
            i++;
        }
        let c = 0;
        if (greed[4][6]>=1){
            for (let i = lastDayIndex + 1; i < 7; i++) {
                greed[5][i] = ++c;
            }
        }
        else {for (let i = lastDayIndex + 1; i < 7; i++) {
            greed[4][i] = ++c;
        }}
        
        return (greed);
    }

    prev = () => {
        const date = new Date(this.state.date);
        const prevDate = date.setMonth(date.getMonth() - 1);
        const newGreed = this.getCurrDate(prevDate);
        const {dateText, month} = this.getTextDate(prevDate);
        this.setState({
            date: prevDate,
            dateGreed: newGreed,
            dateText,
            month
        });
    }
    next = () => {
        const date = new Date(this.state.date);
        const nextDate = date.setMonth(date.getMonth() + 1);
        const newGreed = this.getCurrDate(nextDate);
        const {dateText, month} = this.getTextDate(nextDate);
        this.setState({
            date: nextDate,
            dateGreed: newGreed,
            dateText,
            month
        });
    }
    getTextDate(d){
        const date = new Date(d);
        const months = [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь'
        ];
        const monthsRod = [
            'Января',
            'Февраля',
            'Марта',
            'Апреля',
            'Мая',
            'Июня',
            'Июля',
            'Августа',
            'Сентября',
            'Октября',
            'Ноября',
            'Декабря'
        ];
        const daysOfWeek = [
            'Воскресение',
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Суббота'
        ];
        const dateText = daysOfWeek[new Date().getDay()] + ', ' + new Date().getDate() + ' ' + monthsRod[new Date().getMonth()] + ' ' + new Date().getFullYear();
        const month = months[date.getMonth()];
        return ({
            dateText: dateText,
            month: month
        })
    }
    render = () => {
        const {dateText, month, date, dateGreed} = this.state; 
        const rows = [];
        console.log(dateGreed);
        for (let i = 0; i < 6; i++) {
            rows.push(Raw(dateGreed[i]))
        }
        const year = new Date(date).getFullYear();
        return (
            <div>
                <label>
                    <h1>{dateText}</h1>
                    <p>{month} {year}</p>
                    <Pagination>
                        <PaginationItem>
                            <PaginationLink onClick={this.prev} previous/>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink onClick={this.next} next/>
                        </PaginationItem>
                    </Pagination>
                </label>
                <Table responsive bordered >
                    <thead>
                        <tr>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thu</th>
                            <th>Fri</th>
                            <th>Sat</th>
                            <th>Sun</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows[0]}
                        {rows[1]}
                        {rows[2]}
                        {rows[3]}
                        {rows[4]}
                        {rows[5]}
                    </tbody>
                </Table>
            </div>
        );
    }
}
const Raw = (arr) => {
    if(arr[0]===""){
        return
    }
    return (
        <tr>
            <td>{arr[0]}</td>
            <td>{arr[1]}</td>
            <td>{arr[2]}</td>
            <td>{arr[3]}</td>
            <td>{arr[4]}</td>
            <td>{arr[5]}</td>
            <td>{arr[6]}</td>
        </tr>
    )
}