import React from 'react';
import moment from 'moment';
import Container from '@material-ui/core/Container';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { withStyles, makeStyles, createStyles,Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


import MenuItem from '@material-ui/core/MenuItem';
import './calender.css';

import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { TableFooter } from '@material-ui/core';
const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase);
const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 20,
     
      
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
    },
  }),
)(TableRow);

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  
export default class Calendar extends React.Component {
    state = {
        calenderContext: moment(),
        today: moment(),
        showMonthPopup: false,
        showYearPopup: false,
        monthSelected:false,
        daySelected: null
    }

    constructor(props) {
        super(props);
        this.widht = props.widht || "500PX";
        this.style = props.style || {};
        this.onChangeMonthEvent = this.onChangeMonthEvent.bind(this);
    
    }

    weekdays = moment.weekdays();

    weekdaysShort = moment.weekdaysShort();

    months = moment.months();

    year = () => {
        return this.state.calenderContext.format("Y");
    }

    month = () => {
        return this.state.calenderContext.format("MMMM");
    }

    daysInMonth = () => {
        return this.state.calenderContext.daysInMonth();
    }

    currentDate = () => {
        return this.state.calenderContext.get("date");
    }

    currentDay = () => {
        return this.state.calenderContext.format("D");
    }

    firstDayOfMonth = () => {

        let calenderContext = this.state.calenderContext;
        // console.log(calenderContext);
        // return 1;
        let firstDay = moment(calenderContext).startOf('month').format('d');
        return firstDay;
    }

    monthListPopup = ( props ) => {

        let list = props.months.map(( monthName ) => {
            
            return (
                <MenuItem  key ={monthName} className="calender-month-name" value={monthName}> <a href="#" >
                {monthName}
                </a></MenuItem>
            );
        });
        
        
        return (
            <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={this.state.monthSelected}
            onChange={ (event) => { this.onChangeMonthEvent( event )}}
            input={<BootstrapInput />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
             { list }
          </Select>
        );
    }
    onChangeMonthEvent = (event) => {
        this.setState({monthSelected: event.target.value});
        let monthNo = event.target.value;
        let calenderContext = Object.assign( {} , this.state.calenderContext);
        calenderContext = moment(calenderContext).set("month", monthNo);
        this.setState({
          calenderContext : calenderContext
        });
    }

    yearMenuNavigator = () => {
        const classes = makeStyles((theme) => ({
            formControl: {
              margin: theme.spacing(1),
              minWidth: 120,
            },
            selectEmpty: {
              marginTop: theme.spacing(2),
            },
          }));
        return (
           this.state.showYearPopup ?
           <input
           defaultValue ={this.year()}
           className="edit-year"
           ref= {(yearInput) => {this.yearInput = yearInput}}
           onKeyUp ={(event) => {this.onKeyUpYear(event)}}
           onChange = {(event) => {this.onChangeYear(event)}}
           type = "number"
           />
           :
            <span 
            className="year" 
            onDoubleClick = {(event) => { this.showYearEditor(event)}}>
              {this.year()}
            </span>

        )
    }
    onKeyUpYear = (ev) => {
      if (  ev.which === 13 || ev.which === 27) {
        this.setYearContext(ev.target.value);
        this.setState({
          showYearPopup :false
        })
      }
      
    }


    onChangeYear = (ev) => {
      this.setYearContext(ev.target.value);
    }

    setYearContext =(yearConext) =>{
      let calenderContext = Object.assign({},this.state.calenderContext);
      calenderContext = moment(calenderContext).set('year', yearConext);
      this.setState({
        calenderContext: calenderContext
      });
    }
    showYearEditor = (event) => {
      this.setState({
        showYearPopup : true
      });
    }
    monthMenuNavigator = () => {
        const classes = makeStyles((theme) => ({
            formControl: {
              margin: theme.spacing(1),
              minWidth: 120,
            },
            selectEmpty: {
              marginTop: theme.spacing(2),
            },
          }));
        return (
            <div onClick={ (event) => { this.onChangeMonthEvent( event, this.month())}}>
            <FormControl variant="filled" className={classes.formControl} >
            {this.month()}<this.monthListPopup months={this.months}/>
            </FormControl>
            </div>

        )
    }
    onDayClick = (e,day) => {
      this.setState({
        daySelected: day
      });

      let calenderContext = Object.assign({}, this.state.calenderContext);
      
      calenderContext = moment(calenderContext).set('date', day);
      
      this.setState({
          calenderContext: calenderContext
      });

      this.props.onDayClick && this.props.onDayClick(e,day);
    }

    nextMonth = () => {
      let calenderContext = Object.assign({}, this.state.calenderContext);
      calenderContext = moment(calenderContext).add(1, "month");
      this.setState({
          calenderContext: calenderContext
      });
    }

    prevMonth = () => {
        let calenderContext = Object.assign({}, this.state.calenderContext);
        calenderContext = moment(calenderContext).subtract(1, "month");
        this.setState({
            calenderContext: calenderContext
        });
    }

    resetCalnder = () => {
      let monthNo = this.month();
      let year = this.year();
      let calenderContext = Object.assign( {} , this.state.calenderContext);
      calenderContext = moment(calenderContext).set("month", monthNo);
      calenderContext = moment(calenderContext).set("year", year);
      this.setState({
        calenderContext : calenderContext
      });
    }

    render() {
        const classes = makeStyles({
            table: {
              minWidth: 700,
            },
          });

        let weekdays = this.weekdaysShort.map((day) => {
            return (
                <StyledTableCell key={day} className="week-day" align={'center'}
                >
                    {day}
                </StyledTableCell>
            )
        });

        let daysInMonth = [];

        for (let d = 1; d <= this.daysInMonth(); d++) {
          let className = (d == this.currentDay() ? "day current-day": "day");
          let selectedClass = (d == this.state.selectedDay ? " selected-day " : "")
          daysInMonth.push(
              <StyledTableCell key={d}  align={'center'} className={className + selectedClass} onClick={(e)=>{this.onDayClick(e, d)}}>
                  <span >{d}</span>
              </StyledTableCell>
          );
        }
 
        let blanks = [];

        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(<StyledTableCell className="blanksDates">
                {""}
            </StyledTableCell>
            );
        }
        
        let totalSlots = [...blanks,...daysInMonth];

        let rows = [];

        let cells = [];

        totalSlots.forEach(( row ,index ) => {
            if ( (index % 7 ) !== 0) {
                cells.push( row );
            } else {
                let rowInsert = cells.slice();
                rows.push( rowInsert );
                cells = [];
                cells.push( row );
            }
            if ( index  === totalSlots.length -1 ) {
                let rowInsrt = cells.slice();
                rows.push( rowInsrt );
            }
        });

        let totalTrElems = rows.map((ds,i) => {
          return (
              <TableRow key = {i*100}>
                  {ds}
              </TableRow>
          );
        })
        
        return (
            <TableContainer component={Paper} >
                <Table className={classes.table} aria-label="customized table">
                    <TableHead className="app-calendar-headr">
                        <TableRow className="header-apTableRow">
                          <StyledTableCell>
                            <Button variant="contained" color="primary"  onClick={(e)=> {this.prevMonth()}}>
                              {'Prev'}
                            </Button>
                          </StyledTableCell>
                          <StyledTableCell   >
                              <this.monthMenuNavigator />
                          </StyledTableCell>
                          <StyledTableCell>
                          <Button variant="contained" color="primary"  onClick={(e)=> {this.nextMonth()}} style = {{ float: 'right'}}>
                          {'Next'}
                        </Button>
                          </StyledTableCell>
                          <StyledTableCell  >
                              <this.yearMenuNavigator />
                          </StyledTableCell>
                          <StyledTableCell >
                              {''}
                          </StyledTableCell>
                          <StyledTableCell >
                              {''}
                          </StyledTableCell>
                          <StyledTableCell >
                              {''}
                          </StyledTableCell>
                        </TableRow>
                        
                    </TableHead>
                    <TableBody className="app-calender-body">
                        <TableRow>
                            {weekdays}
                        </TableRow>
                        {totalTrElems}
                    </TableBody>
                   
                </Table>
           </TableContainer>
        )
    }
}