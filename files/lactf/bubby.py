import networkx as nx
import random

def find_eulerian_paths(G, start_node, current_path, visited_edges):
    if len(current_path) == len(visited_edges):
        return [current_path]

    eulerian_paths = []
    for successor in G.neighbors(start_node):
        edge = (start_node, successor)
        if edge not in visited_edges:
            visited_edges.add(edge)
            next_path = find_eulerian_paths(G, successor, current_path + [successor], visited_edges)
            eulerian_paths.extend(next_path)
            visited_edges.remove(edge)
    return eulerian_paths

def arbitrary_element(iterable):
    # print(iterable[0])
    return next(iter(iterable))
    # return random.choice(list(iterable))
    return iterable[random.randrange(len(iterable))]

def _simplegraph_eulerian_circuit(G, source):
    if G.is_directed():
        degree = G.out_degree
        edges = G.out_edges
    else:
        degree = G.degree
        edges = G.edges
    vertex_stack = [source]
    last_vertex = None
    while vertex_stack:
        current_vertex = vertex_stack[-1]
        if degree(current_vertex) == 0:
            if last_vertex is not None:
                yield (last_vertex, current_vertex)
            last_vertex = current_vertex
            vertex_stack.pop()
        else:
            _, next_vertex = arbitrary_element(edges(current_vertex))
            vertex_stack.append(next_vertex)
            G.remove_edge(current_vertex, next_vertex)

def _find_path_start(G):
    """Return a suitable starting vertex for an Eulerian path.

    If no path exists, return None.
    """
    if not nx.has_eulerian_path(G):
        return None

    if nx.is_eulerian(G):
        return arbitrary_element(G)

    if G.is_directed():
        v1, v2 = (v for v in G if G.in_degree(v) != G.out_degree(v))
        # Determines which is the 'start' node (as opposed to the 'end')
        if G.out_degree(v1) > G.in_degree(v1):
            return v1
        else:
            return v2

    else:
        # In an undirected graph randomly choose one of the possibilities
        start = [v for v in G if G.degree(v) % 2 != 0][0]
        return start


def ah_eulerian_path(G, source=None, keys=False):
    # if not nx.has_eulerian_path(G, source):
    #     raise nx.NetworkXError("Graph has no Eulerian paths.")
    if G.is_directed():
        G = G.reverse()
        if source is None or nx.is_eulerian(G) is False:
            source = _find_path_start(G)
        if G.is_multigraph():
            # for u, v, k in _multigraph_eulerian_circuit(G, source):
            #     if keys:
            #         yield u, v, k
            #     else:
            #         yield u, v
            raise Exception('hey')
        else:
            yield from _simplegraph_eulerian_circuit(G, source)

def reconstruct_string_from_pairs(pairs):
    eulerian_paths = set()

    # for _ in range(50):
    #     # Create a directed graph
    #     G = nx.DiGraph()

    #     # Iterate through each pair and add edges to the graph
    #     random.shuffle(pairs)
    #     for pair in pairs:
    #         G.add_edge(pair[:-1], pair[1:], hey=pair)

    #     eulerian_paths.add(tuple(nx.eulerian_path(G)))

    # Reconstruct the Eulerian path
    # eulerian_path = [nx.eulerian_path]
    # eulerian_paths = set()
    # print(eulerian_paths)
    # eulerian_path = list(eulerian_paths)[0]

    G = nx.DiGraph()

        # Iterate through each pair and add edges to the graph
    for pair in pairs:
        G.add_edge(pair[:-1], pair[1:], hey=pair)
    eulerian_path = list(nx.eulerian_path(G))
    # try:
    #     print(nx.find_cycle(G))
    # except nx.exception.NetworkXNoCycle:
    #     pass

    # start_nodes = [node for node in G.nodes if G.out_degree(node) - G.in_degree(node) == 1]
    # if len(start_nodes) != 1:
    #     raise ValueError("Graph does not have a unique Eulerian path")
    # start_node = start_nodes[0]
    # eulerian_paths = find_eulerian_paths(G, start_node, [start_node], set())
    # print(eulerian_paths)

    # Reconstruct the string from the Eulerian path
    # for i, eulerian_path in enumerate(eulerian_paths, 1):
    reconstructed_string = eulerian_path[0][0] + ''.join([pair[1] for pair in eulerian_path])
        # print(f'{i}. {reconstructed_string}')

    return reconstructed_string

# pairs = set()
# while True:
#     line = input()
#     if line:
#         pairs.add(line.split('/')[-1])
#     else:
#         break
# if len(pairs) != 79:
#     print(f'{len(pairs)} pairs. unacceptable')
#     exit(1)
import sys
# https://quickstyle.chall.lac.tf/?user=1&page=https://28eb-2600-1700-7c00-1560-00-14.ngrok-free.app
s = reconstruct_string_from_pairs(sys.argv[1].split('-'))
print(s)
# print('https://quickstyle.chall.lac.tf/flag?user=1&otp=' + s)
