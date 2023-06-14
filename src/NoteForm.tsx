import React, { FormEvent } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Creatable from 'react-select/creatable'

const NoteForm = () => {

    
    const handleSubmit = (e : FormEvent) => {
        e.preventDefault()


    }
  return (
    <>
        <Form onSubmit={ handleSubmit }>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tag">
                            <Form.Label>Tag</Form.Label>
                            <Creatable isMulti />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="markdown">
                    <Form.Label>Body</Form.Label>
                    <Form.Control as="textarea" rows={10} required />
                </Form.Group>
                <Stack direction='horizontal' gap={2} className='justify-content-end'>
                    <Button type='submit' variant='primary'>Save</Button>
                    <Link to='..'>
                        <Button type='button' variant='outline-secondary'>Cancel</Button>
                    </Link>
                </Stack>
            </Stack>
        </Form>
    </>
  )
}

export default NoteForm