import {StyledSharpCard} from "../css/common";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography"
import React from "react";
import {red, lightGreen, pink, deepPurple, deepOrange} from "@material-ui/core/colors"
import {makeStyles} from "@material-ui/core/styles"
import Avatar from "@material-ui/core/Avatar"
import BugReportIcon from "@material-ui/icons/BugReport"
import ChildCareIcon from "@material-ui/icons/ChildCare"
import DescriptionIcon from "@material-ui/icons/Description"
import AcUnitIcon from "@material-ui/icons/AcUnit"

const useStyles = makeStyles((theme) => ({
    sample: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        width: theme.spacing(6),
        height: theme.spacing(6)
    },
    milk: {
        color: theme.palette.getContrastText(pink[500]),
        backgroundColor: pink[500],
        width: theme.spacing(6),
        height: theme.spacing(6)
    },
    document: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
        width: theme.spacing(6),
        height: theme.spacing(6)
    },
    other: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: lightGreen[500],
        width: theme.spacing(6),
        height: theme.spacing(6)
    }
}))

function getIcon(typeID) {
    switch(typeID) {
        case 1:
            return <BugReportIcon/>
        case 2:
            return <DescriptionIcon/>
        case 3:
            return <ChildCareIcon/>
        default:
            return <AcUnitIcon/>
    }
}

export default function DeliverableCard(props) {
    const classes = useStyles();

    function getClass(typeID) {
        switch(typeID) {
            case 1:
                return classes.sample
            case 2:
                return classes.document
            case 3:
                return classes.milk
            default:
                return classes.other
        }
    }

    return (
        <StyledSharpCard style={{height: "100px"}}>
            <Grid container spacing={2} justify={"flex-start"} alignItems={"center"} direction={"row"}>
                <Grid item>
                    <Avatar className={getClass(props.deliverable.type_id)}>
                        {getIcon(props.deliverable.type_id)}
                    </Avatar>
                </Grid>
                <Grid item>
                    <Typography>
                        {props.deliverable.type}
                    </Typography>
                </Grid>
            </Grid>
        </StyledSharpCard>
    )
}
