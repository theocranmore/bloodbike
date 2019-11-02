/*
export default class DeliverableDropSelect extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
    }


    componentDidMount() {
        let result = this.props.availableDeliverables.filter(item => item.name === this.props.deliverable.type);
        this.setState({
            deliverableType: result.length === 1 ? result[0].id : null

        });
    }

    state = {
        deliverableType: null,
        description: this.props.deliverable.notes.length ? this.props.deliverable.notes[0].body : "",
        labelWidth: 0
    };


    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

     handleChange = event => {
            this.setState({
                "deliverableType": event.target.value
            });
        this.props.onSelect(this.props.uuid, event.target.value);
    };

    handleDescChange = event => {
        console.log(event)
        if(data !== this.state.description){
            this.props.onNoteChange(this.props.deliverable.desc_note_id, data);
            this.setState({
                description: data
            });
        }
    };*/
/*
    render() {

        let menuItems = [];
        for (const item of this.props.availableDeliverables) {
            menuItems.push(<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
        }

        return (
            <form autoComplete="off">
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-deliverable">
                        Deliverable
                    </InputLabel>
                    <Grid spacing={8} container direction={"row"} justify={"space-between"} alignItems={"center"}>
                        <Grid item>
                            <Select
                                value={this.state.deliverableType}
                                onChange={this.handleChange}
                                labelWidth={0}
                                inputProps={{
                                    name: 'deliverable',
                                    id: 'outlined-deliverable',
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {menuItems}
                            </Select>
                        </Grid>
                        <Grid item>
                            <TextField onChange={this.handleDescChange} label={"Description"} id={"descField"}/>
                        </Grid>
                    </Grid>
                </FormControl>
            </form>
        );
    }
}

*/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function DeliverableDropSelect(props) {
    const classes = useStyles();
    let result = props.availableDeliverables.filter(item => item.name === props.deliverable.type);
    const [type, setType] = React.useState(result.length === 1 ? result[0].id : null);


    let menuItems = [];
    for (const item of props.availableDeliverables) {
        menuItems.push(<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
    }


    const handleChange = event => {
        setType(event.target.value);
        props.onSelect(props.uuid, event.target.value);
    };

    return (
        <div>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">Deliverable</InputLabel>
                <Select
                    labelId="deliverable-label"
                    id="deliverable-dropdown"
                    value={type}
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {menuItems}
                </Select>
            </FormControl>
        </div>
    );
}
