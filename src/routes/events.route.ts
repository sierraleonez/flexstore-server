import express, { Router } from "express";
import { dummyEvents } from "../dummy/dummy";

export function EventsRoute(): Router {
    const router = express.Router()
    router.get("/", (_, res) => {
        res.send({
            status: 'success',
            message: 'ok',
            data: dummyEvents
        })
    })

    router.get("/:id", (req, res) => {
        const id = req.params.id
        const event = dummyEvents.find(event => event.id === id)
        console.log(event?.title)
        res.send({
            status: "success",
            data: event
        })
    })

    return router
}