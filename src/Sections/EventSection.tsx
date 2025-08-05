import { useEffect, useState } from 'react';
import client from '../sanityClient';

import { SlCalender } from "react-icons/sl";
import { SlLocationPin } from "react-icons/sl";

interface Event {
    _id: string;
    title: string;
    description: string;
    location: string;
    date: string;
    coverImage?: { asset: { url: string } };
}

const EventSection = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    // State for search input
    const [search, setSearch] = useState('');

    useEffect(() => {
        client.fetch(
            `*[_type == "event"]{_id, title, description, location, date, coverImage{asset->{url}}}`
        ).then((data) => {
            setEvents(data);
            setLoading(false);
        });
    }, []);

    // Filter events by title or location (case-insensitive)
    const filteredEvents = events.filter(event => {
        const searchLower = search.toLowerCase();
        return (
            event.title.toLowerCase().includes(searchLower) ||
            event.location.toLowerCase().includes(searchLower)
        );
    });

    return (
        <>  
            <div className='w-screen h-max bg-[var(--primary)] text-[var(--secondary)] font-michroma flex flex-col items-center justify-start pt-28 overflow-x-hidden'>
                <div className='w-4/5 flex flex-col items-start justify-start '>
                    <h1 className='text-[32px] md:text-[32px] lg:text-[32px] xl:text-[64px] 2xl:text-[64px] font-michroma mb-8'>Events</h1>

                    {/* Search Bar */}
                    <div className='w-full h-20 flex flex-row items-center justify-start border-2 border-[var(--secondary)] gap-4 rounded-lg mb-8'>
                        <input
                            type="text"
                            className='w-full h-full bg-transparent border-none outline-none pl-12 text-[16px] md:text-[16px] lg:text-[16px] 2xl:text-[20px] text-[var(--secondary)]'
                            placeholder='Browse your near by upcoming events'
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Events */}
                    {loading ? (
                        <div>Loading...</div>
                    ) : filteredEvents.length === 0 ? (
                        <div>No events found.</div>
                    ) : (
                        <div className='flex flex-col items-center justify-start gap-4 w-full mt-12'>
                            {filteredEvents.map((event) => (
                                <div key={event._id} className='text-[var(--secondary)] w-full h-full flex flex-row items-start gap-8 justify-start'>
                                    {event.coverImage?.asset?.url && (
                                        <img
                                            src={event.coverImage.asset.url}
                                            alt={event.title}
                                            className='w-full h-full object-cover'
                                        />
                                    )}
                                    <div className='flex flex-col items-start justify-between h-full relative gap-8 w-full'>
                                        <h2 className='text-[24px] md:text-[24px] lg:text-[32px] 2xl:text-[32px] font-michroma mb-2'>{event.title}</h2>
                                        <div className='flex flex-row items-center justify-start gap-4 w-full'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <SlCalender className='text-[24px] md:text-[24px] lg:text-[24px] 2xl:text-[24px]' />
                                                <p className='text-[16px] md:text-[16px] lg:text-[16px] 2xl:text-[16px]'>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                            </div>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <SlLocationPin className='text-[24px] md:text-[24px] lg:text-[24px] 2xl:text-[24px]' />
                                                <p className='text-[16px] md:text-[16px] lg:text-[16px] 2xl:text-[16px]'>{event.location}</p>
                                            </div>
                                        </div>

                                        {/* Register Button */}
                                        <div>
                                            <button
                                                className='bg-[var(--secondary)] text-[var(--primary)] px-4 py-2 rounded-md cursor-pointer'
                                                onClick={() => setIsPopupOpen(true)}
                                            >
                                                Register
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay Popup */}
            {
                isPopupOpen && (
                    <div className='absolute top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex flex-col items-center justify-center'>
                        <div className='w-1/2 h-4/5 bg-white rounded-md flex flex-col items-center justify-center'>
                            <div className='w-full h-full flex flex-row items-center justify-between'>
                                <h1 className='text-[32px] md:text-[32px] lg:text-[32px] xl:text-[64px] 2xl:text-[64px] font-michroma'>Register</h1>
                                <button className='text-[32px] md:text-[32px] lg:text-[32px] xl:text-[64px] 2xl:text-[64px] font-michroma' onClick={() => setIsPopupOpen(false)}>X</button>
                            </div>
                            <h1
                                className='text-[32px] md:text-[32px] lg:text-[32px] xl:text-[64px] 2xl:text-[64px] font-michroma'
                                onClick={() => setIsPopupOpen(false)}
                            >Popup</h1>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default EventSection;
