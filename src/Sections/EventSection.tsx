import { useEffect, useState } from 'react';
import client from '../sanityClient';

import { SlCalender } from "react-icons/sl";
import { SlLocationPin } from "react-icons/sl";

/**
 * Responsive Analysis for Text, Image, and Sizes:
 * 
 * sm (mobile):
 *   - Main heading: text-[24px]
 *   - Search input: text-[12px]
 *   - Event card: flex-col, gap-4, image: h-40, text: text-[14px]
 *   - Button: text-[14px], px-3, py-1.5
 * 
 * md (tablet):
 *   - Main heading: text-[32px]
 *   - Search input: text-[16px]
 *   - Event card: flex-col, gap-6, image: h-56, text: text-[16px]
 *   - Button: text-[16px], px-4, py-2
 * 
 * lg (desktop):
 *   - Main heading: text-[48px]
 *   - Search input: text-[18px]
 *   - Event card: flex-row, gap-8, image: h-72, text: text-[20px]
 *   - Button: text-[20px], px-6, py-3
 */

interface Event {
    _id: string;
    title: string;
    description: string;
    location: string;
    date: string;
    coverImage?: { asset: { url: string } };
    link?: string;
}

const EventSection = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    // State for search input
    const [search, setSearch] = useState('');

    useEffect(() => {
        client.fetch(
            `*[_type == "event"]{_id, title, description, location, date, link, coverImage{asset->{url}}}`
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
            <div className='w-screen h-max bg-[var(--primary)] text-[var(--secondary)] font-michroma flex flex-col items-center justify-start pt-20 md:pt-24 lg:pt-28 overflow-x-hidden'>
                <div className='w-[90%] md:w-4/5 flex flex-col items-start justify-start'>
                    <h1 className='
                        text-[24px] 
                        md:text-[32px] 
                        lg:text-[48px] 
                        xl:text-[64px] 
                        2xl:text-[64px] 
                        font-michroma mb-6 md:mb-8
                    '>
                        Events
                    </h1>

                    {/* Search Bar */}
                    <div className='
                        w-full 
                        h-10 md:h-12 lg:h-16 xl:h-20 
                        flex flex-row items-center justify-start 
                        border-2 border-[var(--secondary)] 
                        gap-2 md:gap-4 
                        rounded-lg mb-6 md:mb-8
                    '>
                        <input
                            type="text"
                            className='
                                w-full h-full bg-transparent border-none outline-none 
                                pl-3 md:pl-6 lg:pl-10 xl:pl-12 
                                text-[12px] md:text-[16px] lg:text-[18px] 2xl:text-[20px] 
                                text-[var(--secondary)]
                            '
                            placeholder='Browse your near by upcoming events'
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Events */}
                    {loading ? (
                        <div className="text-[16px] md:text-[18px] lg:text-[20px]">Loading...</div>
                    ) : filteredEvents.length === 0 ? (
                        <div className="text-[16px] md:text-[18px] lg:text-[20px]">No events found.</div>
                    ) : (
                        <div className='flex flex-col items-center justify-start gap-4 md:gap-6 lg:gap-8 w-full mt-8 md:mt-12'>
                            {filteredEvents.map((event) => (
                                <div 
                                    key={event._id} 
                                    className='
                                        text-[var(--secondary)] 
                                        w-full 
                                        flex flex-col lg:flex-row 
                                        items-start 
                                        gap-4 md:gap-6 lg:gap-8 
                                        justify-start 
                                        mb-6 md:mb-8
                                    '
                                >
                                    {event.coverImage?.asset?.url && (
                                        <img
                                            src={event.coverImage.asset.url}
                                            alt={event.title}
                                            className='
                                                w-full lg:w-1/3 
                                                h-40 md:h-56 lg:h-72 
                                                object-cover 
                                                rounded-md
                                            '
                                        />
                                    )}
                                    <div className='
                                        flex flex-col items-start justify-between 
                                        h-full relative 
                                        gap-4 md:gap-6 lg:gap-8 
                                        w-full
                                    '>
                                        <h2 className='
                                            text-[14px] md:text-[16px] lg:text-[20px] xl:text-[24px] 2xl:text-[32px] 
                                            font-michroma mb-1 md:mb-2
                                        '>
                                            {event.title}
                                        </h2>
                                        <div className='
                                            flex flex-col lg:flex-row 
                                            items-start lg:items-center 
                                            justify-start 
                                            gap-2 md:gap-4 
                                            w-full
                                        '>
                                            <div className='flex flex-row items-center justify-start gap-1 md:gap-2'>
                                                <SlCalender className='text-[14px] md:text-[18px] lg:text-[20px] xl:text-[24px]' />
                                                <p className='text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[20px]'>
                                                    {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                </p>
                                            </div>
                                            <div className='flex flex-row items-center justify-start gap-1 md:gap-2'>
                                                <SlLocationPin className='text-[14px] md:text-[18px] lg:text-[20px] xl:text-[24px]' />
                                                <p className='text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[20px]'>
                                                    {event.location}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Register Button */}
                                        <div>
                                            <button
                                                className='
                                                    bg-[var(--secondary)] text-[var(--primary)] 
                                                    px-3 md:px-4 lg:px-6 
                                                    py-1.5 md:py-2 lg:py-3 
                                                    rounded-md cursor-pointer 
                                                    text-[14px] md:text-[16px] lg:text-[20px] xl:text-[24px]
                                                '
                                                onClick={() => {
                                                    if (event.link) {
                                                        window.open(event.link, '_blank');
                                                    }
                                                }}
                                                disabled={!event.link}
                                                style={event.link ? {} : { opacity: 0.5, cursor: 'not-allowed' }}
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
                    <div className='
                        fixed top-0 left-0 w-full h-screen 
                        bg-black bg-opacity-50 
                        flex flex-col items-center justify-center
                        z-50
                    '>
                        <div className='
                            w-[90%] md:w-2/3 lg:w-1/2 
                            h-3/5 md:h-4/5 
                            bg-white rounded-md 
                            flex flex-col items-center justify-center
                        '>
                            <div className='w-full flex flex-row items-center justify-between px-4 py-2'>
                                <h1 className='
                                    text-[24px] md:text-[32px] lg:text-[48px] xl:text-[64px] 2xl:text-[64px] 
                                    font-michroma
                                '>
                                    Register
                                </h1>
                                <button 
                                    className='
                                        text-[24px] md:text-[32px] lg:text-[48px] xl:text-[64px] 2xl:text-[64px] 
                                        font-michroma
                                    ' 
                                    onClick={() => setIsPopupOpen(false)}
                                >
                                    X
                                </button>
                            </div>
                            <h1
                                className='
                                    text-[24px] md:text-[32px] lg:text-[48px] xl:text-[64px] 2xl:text-[64px] 
                                    font-michroma
                                '
                                onClick={() => setIsPopupOpen(false)}
                            >
                                Popup
                            </h1>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default EventSection;
