/* eslint-disable newline-before-return */
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function OppositeContentTimeline() {
    const router = useRouter();
    const { id } = router.query;
    const [usuarios, setUsuarios] = useState([]);
    const [comentarios, setComentarios] = useState([]);

    useEffect(() => {
        fetch(`/api/comentarios/${id}/`)
            .then(response => response.json())
            .then(data => setComentarios(data))
            .catch(error => console.log(error));
    }, [id]);

    useEffect(() => {
        fetch('/api/usuario')
            .then(response => response.json())
            .then(data => setUsuarios(data))
            .catch(error => console.log(error));
    }, []);

    const encontrarUsuarioPorId = (id) => {
        if (typeof id !== 'number' || isNaN(id)) {
            return null;
        }
        return usuarios.find(usuario => usuario.id === id);
    }

    return (
        <Timeline position="alternate">
            {Array.isArray(comentarios) && comentarios.map((comentario, index) => (
                <TimelineItem key={index}>
                    <TimelineOppositeContent color="text.secondary">
                    <strong>{encontrarUsuarioPorId(comentario.usuarioID)?.nome}</strong>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>{comentario.texto}</TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    );
}
